import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EngineerRepairSchema } from "src/model/schemas/engineer";
import { AccountModule } from "../../account/account.module";
import { EngineerRepairController } from "./engineer-repair.controller";
import { EngineerRepairService } from "./engineer-repair.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "repairs", schema: EngineerRepairSchema },
    ]),
  ],
  controllers: [EngineerRepairController],
  providers: [EngineerRepairService],
})
export class EngineeringRepairModule { }