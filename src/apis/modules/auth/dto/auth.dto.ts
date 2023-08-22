import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({
    description: "id_card",
    example: "รหัสบัตรประชาชน",
  })
  id_card: string;
  @ApiProperty({
    description: "password",
    example: "รหัสผ่าน hash ras",
  })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: "refresh_token",
    example: "refresh token",
  })
  refresh_token: string;
}

export class VerifyTokenDto {
  @ApiProperty({
    description: "access_token",
    example: "access token",
  })
  access_token: string;
}
