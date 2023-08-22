import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EngineerWorksheetCheckSchema } from 'src/model/schemas/engineer/engineer-worksheet-check';
import { EngineerWorksheetCheckController } from './worksheet-check.controller';
import { EngineerWorksheetCheckService } from './worksheet-check.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'worksheet_checks', schema: EngineerWorksheetCheckSchema },
    ]),
  ],
  controllers: [EngineerWorksheetCheckController],
  providers: [EngineerWorksheetCheckService],
})
export class EngineerWorksheetCheckModule { }
