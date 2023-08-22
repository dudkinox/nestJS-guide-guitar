import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HouseSchema } from 'src/model/schemas/house';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'houses', schema: HouseSchema }]),
  ],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
