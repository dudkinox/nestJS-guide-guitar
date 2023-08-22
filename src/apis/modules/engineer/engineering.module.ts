import { Module } from '@nestjs/common';
import { EngineeringPlanModule } from './engineer-plans/engineering-plans.module';
import { EngineeringRepairModule } from './engineer-repair/engineer-repair.module';
import { EngineerWorksheetCheckModule } from './engineer-worksheet-check/worksheet-check.module';
import { AnswerModule } from './engineer-worksheet-template/answer/answer.module';
import { EngineerWorksheetTemplateModule } from './engineer-worksheet-template/worksheet-template.module';
import { EngineeringBaseModule } from './engineering-base/engineering-base.module';

@Module({
  imports: [
    AnswerModule,
    EngineeringPlanModule,
    EngineeringRepairModule,
    EngineerWorksheetCheckModule,
    EngineeringBaseModule,
    EngineerWorksheetTemplateModule,
  ],
  controllers: [],
  providers: [],
})
export class EngineeringModule { }
