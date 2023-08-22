import { Module } from '@nestjs/common';
import { SparePartsController } from './spare-parts.controller';
import { SparePartsService } from './spare-parts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SparePartSchema } from 'src/model/schemas/spare-parts/spare-parts';
import { RouterModule } from '@nestjs/core';
import { PickUpPartModule } from './pick-up-parts/pick-up-parts.module';
import { ReturnPartsModule } from './return-parts/return-parts.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'spare_parts', schema: SparePartSchema },
    ]),
    PickUpPartModule,
    ReturnPartsModule,
    RouterModule.register([
      {
        path: 'spare-parts',
        module: SparePartsModule,
        children: [
          {
            path: 'pick-up-parts',
            module: PickUpPartModule,
          },
          {
            path: 'return-parts',
            module: ReturnPartsModule,
          },
        ],
      },
    ]),
  ],
  controllers: [SparePartsController],
  providers: [SparePartsService],
})
export class SparePartsModule {}
