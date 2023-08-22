import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AnswerSchema } from "src/model/schemas/engineer/models/answer-model";
import { AnswerController } from "./answer.controller";
import { AnswerService } from "./answer.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'answers', schema: AnswerSchema }
    ]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule { }
