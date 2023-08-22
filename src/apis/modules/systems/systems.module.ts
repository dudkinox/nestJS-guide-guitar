import { Module } from "@nestjs/common";
import { SystemsService } from "./systems.service";
import { SystemsController } from "./systems.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { SystemsSchema } from "src/model/schemas/systems";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "system", schema: SystemsSchema }]),
  ],
  providers: [SystemsService],
  controllers: [SystemsController],
})
export class SystemsModule {}
