import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "./dto/auth.dto";
import { AccountService } from "../account/account.service";
import { UconnectServiceConstant } from "src/constants/uconnectConstant";
import { RsaUtil } from "src/utils/rsa";

@Injectable()
export class LoginService {
  private readonly revokedTokens = new Set<string>();
  constructor(
    private userService: AccountService,
    private jwtService: JwtService,
    private rsaUtil: RsaUtil
  ) {}
  async login(authDto: AuthDto): Promise<
    | {
        accessToken: string;
        refreshToken: string;
      }
    | any
  > {
    try {
      const password = this.rsaUtil.decrypt(authDto.password);
      const user = await this.userService.getUserByIdCard(authDto.id_card);
      Logger.log("getUserByIdCard for get have user : " + JSON.stringify(user));

      if (this.rsaUtil.decrypt(user.password) !== password) {
        throw new BadRequestException("Invalid credentials");
      }

      return await this.getTokens(user);
    } catch (error) {
      Logger.error(`LoginService POST : apis/auth/login ${error}`);
      throw new BadRequestException(error);
    }
  }

  async getTokens(payload: any) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: UconnectServiceConstant.JWT_ACCESS_SECRET,
          expiresIn: "99999d",
        }
      ),
      this.jwtService.signAsync(
        {
          payload,
        },
        {
          secret: UconnectServiceConstant.JWT_REFRESH_SECRET,
          expiresIn: "99999d",
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<
    | {
        accessToken: string;
        refreshToken: string;
      }
    | any
  > {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: UconnectServiceConstant.JWT_REFRESH_SECRET,
      });
      return await this.getTokens(payload);
    } catch (error) {
      throw new BadRequestException("Invalid refresh token");
    }
  }

  logout(accessToken: string) {
    this.revokedTokens.add(accessToken);
  }

  isTokenRevoked(token: string) {
    return this.revokedTokens.has(token);
  }
}
