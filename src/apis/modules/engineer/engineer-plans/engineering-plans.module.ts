import { Module } from '@nestjs/common';
import { EngineeringBaseModule } from '../engineering-base/engineering-base.module';
import { EngineeringPlansController } from './engineering-plans.controller';
import { EngineeringPlansService } from './engineering-plans.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EngineerPlansSchema } from 'src/model/schemas/engineer/engineer-plans';
import { EngineerWorksheetTemplateModule } from '../engineer-worksheet-template/worksheet-template.module';
import { EngineerWorksheetCheckModule } from '../engineer-worksheet-check/worksheet-check.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'engineer_plans', schema: EngineerPlansSchema },
    ]),
    EngineeringBaseModule,
    EngineerWorksheetTemplateModule,
    EngineerWorksheetCheckModule,
  ],
  controllers: [EngineeringPlansController],
  providers: [EngineeringPlansService],
})
export class EngineeringPlanModule {}
