import { Module } from "@nestjs/common";
import { MachineryController } from "./machinery.controller";
import { MachineryService } from "./machinery.service";
import { MongooseModule } from "@nestjs/mongoose";
import { MachinerySchema } from "src/model/schemas/machinery/machinery";
import { MachineryHistorySchema } from "src/model/schemas/machinery/machinery-history";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "machineries", schema: MachinerySchema },
      { name: "machinery_history", schema: MachineryHistorySchema },
    ]),
  ],
  controllers: [MachineryController],
  providers: [MachineryService],
})
export class MachineryModule {}
