import { Module } from '@nestjs/common';
import { WaterMeterController } from './water-meter.controller';
import { WaterMeterService } from './water-meter.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WaterMeterSchema } from 'src/model/schemas/meter/water-meter';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'water_meters', schema: WaterMeterSchema },
    ]),
  ],
  controllers: [WaterMeterController],
  providers: [WaterMeterService],
})
export class WaterMeterModule {}
