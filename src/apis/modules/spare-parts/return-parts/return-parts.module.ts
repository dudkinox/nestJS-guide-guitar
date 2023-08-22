import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnPartsSchema } from 'src/model/schemas/spare-parts/return-parts';
import { ReturnPartsController } from './return-parts.controller';
import { ReturnPartService } from './return-parts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'return_parts', schema: ReturnPartsSchema },
    ]),
  ],
  controllers: [ReturnPartsController],
  providers: [ReturnPartService],
})
export class ReturnPartsModule {}
