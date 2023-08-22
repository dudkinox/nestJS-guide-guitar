import { Module } from '@nestjs/common';
import { PowerMeterModule } from './power-meter/power-meter.module';
import { WaterMeterModule } from './water-meter/water-meter.module';

@Module({
  imports: [WaterMeterModule, PowerMeterModule],
})
export class MeterModule {}
