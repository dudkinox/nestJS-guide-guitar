import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DistrictSchema,
  ProvinceSchema,
  SubDistrictSchema,
} from 'src/model/schemas/location';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'provinces', schema: ProvinceSchema }]),
    MongooseModule.forFeature([{ name: 'districts', schema: DistrictSchema }]),
    MongooseModule.forFeature([
      { name: 'subdistricts', schema: SubDistrictSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
