import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EngineeringBaseController } from './engineering-base.controller';
import { EngineerBaseService } from './engineering-base.service';
import {
  EngineerCheckerTeamSchema,
  EngineerFrequencyTypeSchema,
  EngineerPlaceSchema,
  EngineerServiceAreaSchema,
  EngineerSystemSchema,
  EngineerUnitSchema,
  EngineerWorkTypeSchema,
} from 'src/model/schemas/engineer';
import { AccountModule } from '../../account/account.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'frequencies', schema: EngineerFrequencyTypeSchema },
      { name: 'checker_teams', schema: EngineerCheckerTeamSchema },
      { name: 'places', schema: EngineerPlaceSchema },
      { name: 'service_areas', schema: EngineerServiceAreaSchema },
      { name: 'work_types', schema: EngineerWorkTypeSchema },
      { name: 'systems', schema: EngineerSystemSchema },
      { name: 'units', schema: EngineerUnitSchema },
    ]),
    AccountModule,
  ],
  controllers: [EngineeringBaseController],
  providers: [EngineerBaseService],
})
export class EngineeringBaseModule {}
