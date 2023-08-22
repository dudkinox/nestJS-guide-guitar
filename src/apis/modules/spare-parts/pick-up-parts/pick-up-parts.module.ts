import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PickUpPartsSchema } from 'src/model/schemas/spare-parts/pick-up-parts';
import { PickUpPartController } from './pick-up-parts.controller';
import { PickUpPartService } from './pick-up-parts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'pick_up_parts', schema: PickUpPartsSchema },
    ]),
  ],
  controllers: [PickUpPartController],
  providers: [PickUpPartService],
})
export class PickUpPartModule {}
