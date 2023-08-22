import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EngineerWorksheetTemplateSchema } from 'src/model/schemas/engineer/engineer-worksheet-template';
import { DetailsSchema } from 'src/model/schemas/engineer/models/details-model';
import { QuestionChoicesSchema } from 'src/model/schemas/engineer/models/question-choices-model';
import { QuestionsModelSchema } from 'src/model/schemas/engineer/models/questions-model';
import { AnswerModule } from './answer/answer.module';
import { EngineerWorksheetTemplateController } from './worksheet-template.controller';
import { EngineerWorkSheetTemplateService } from './worksheet-template.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'questions', schema: QuestionsModelSchema },
      { name: 'worksheet_templates', schema: EngineerWorksheetTemplateSchema },
      { name: 'details', schema: DetailsSchema },
      { name: 'choices', schema: QuestionChoicesSchema },
    ]),
    AnswerModule,
  ],
  controllers: [EngineerWorksheetTemplateController],
  providers: [EngineerWorkSheetTemplateService],
})
export class EngineerWorksheetTemplateModule {}
