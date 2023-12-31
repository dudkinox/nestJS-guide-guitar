import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { RolesSchema } from "src/model/schemas/roles";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "roles", schema: RolesSchema }]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
