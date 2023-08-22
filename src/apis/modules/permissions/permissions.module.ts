import { Module } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { PermissionsController } from "./permissions.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PermissionsSchema } from "src/model/schemas/permissions";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "permissions", schema: PermissionsSchema },
    ]),
  ],
  providers: [PermissionsService],
  controllers: [PermissionsController],
})
export class PermissionsModule {}
