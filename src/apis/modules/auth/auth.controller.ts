import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthDto, RefreshTokenDto, VerifyTokenDto } from './dto/auth.dto';
import {
  UconnectServiceConstant,
  StatusCodeModel,
} from 'src/constants/uconnectConstant';
import { JwtRefreshGuard } from './guards/jwtRefreshGuard';
import { LoginService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@ApiTags('Authentication service')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Post('login')
  @HttpCode(200)
  async login(@Body() authDto: AuthDto) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'Verify accessToken.',
        },
        data: await this.loginService.login(authDto),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.AUTH_SERVICE,
            description: 'verifyToken error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('verify')
  verifyToken(@Req() req: Request) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'Verify accessToken.',
        },
        data: true,
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'verifyToken error : ' + error,
        },
        data: null,
      };
    }
  }
  @UseGuards(JwtRefreshGuard)
  @Get('verify-refresh')
  verifyRefreshToken(@Req() req: Request) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'Verify refreshToken.',
        },
        data: true,
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'verifyRefreshToken error : ' + error,
        },
        data: null,
      };
    }
  }

  @Post('refresh')
  async refreshToken(@Body() refreshToken: RefreshTokenDto) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'refreshToken.',
        },
        data: await this.loginService.refreshToken(refreshToken.refresh_token),
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'RefreshToken error : ' + error,
        },
        data: null,
      };
    }
  }

  @Post('logout')
  async logout(@Body() accessToken: VerifyTokenDto) {
    try {
      return {
        status: {
          code: StatusCodeModel.SUCCESS.code,
          message: StatusCodeModel.SUCCESS.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'logout.',
        },
        data: this.loginService.logout(accessToken.access_token),
      };
    } catch (error) {
      return {
        status: {
          code: StatusCodeModel.FAILED.code,
          message: StatusCodeModel.FAILED.message,
          service: UconnectServiceConstant.AUTH_SERVICE,
          description: 'Logout error : ' + error,
        },
        data: null,
      };
    }
  }
}
