import { Module } from '@nestjs/common';
import { PowerMeterService } from './power-meter.service';
import { PowerMeterController } from './power-meter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PowerMeterSchema } from 'src/model/schemas/meter/power-meter';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'power_meters', schema: PowerMeterSchema },
    ]),
  ],
  providers: [PowerMeterService],
  controllers: [PowerMeterController],
})
export class PowerMeterModule {}
