import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReturnParts } from 'src/model/schemas/spare-parts/return-parts';
import { CreateReturnPartsDto } from './dto/createReturnParts.dto';
import { UpdateReturnPartsDto } from './dto/updateReturnParts.dto';

@Injectable()
export class ReturnPartService {
  constructor(
    @InjectModel('return_parts')
    private readonly returnPartsModel: Model<ReturnParts>
  ) {}

  async getAllEngineerReturnParts() {
    try {
      return await this.returnPartsModel.find({ is_active: true });
    } catch (error) {
      Logger.error('[GET] /apis/spare-parts/return-parts : ' + error);
      throw error;
    }
  }
  async getByIdEngineerReturnParts(id: string) {
    try {
      return await this.returnPartsModel.findById(id);
    } catch (error) {
      Logger.error('[GET] /apis/spare-parts/return-parts/:id : ' + error);
    }
  }
  async createEngineerReturnParts(
    createReturnPartsDto: CreateReturnPartsDto,
    user_id: string
  ) {
    try {
      const {
        engineer_pick_up_parts_id,
        requester_id,
        spare_parts,
        inspector_id,
      } = createReturnPartsDto;

      return await this.returnPartsModel.create({
        ...createReturnPartsDto,
        engineer_pick_up_parts_id: engineer_pick_up_parts_id
          ? {
              data: engineer_pick_up_parts_id,
              _id: engineer_pick_up_parts_id,
            }
          : undefined,
        spare_parts: spare_parts
          ? spare_parts.map((each) => {
              return { data: each, _id: each };
            })
          : undefined,
        requester_id: { data: requester_id, _id: requester_id },
        inspector_id: { data: inspector_id, _id: inspector_id },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      Logger.error('[POST] /apis/spare-parts/return-parts : ' + error);
      throw error;
    }
  }
  async updateEngineerReturnParts(
    id: string,
    updateReturnPartsDto: UpdateReturnPartsDto,
    user_id: string
  ) {
    try {
      const {
        engineer_pick_up_parts_id,
        requester_id,
        spare_parts,
        inspector_id,
      } = updateReturnPartsDto;
      return await this.returnPartsModel.findByIdAndUpdate(
        id,
        {
          ...updateReturnPartsDto,

          engineer_pick_up_parts_id: engineer_pick_up_parts_id
            ? {
                data: engineer_pick_up_parts_id,
                _id: engineer_pick_up_parts_id,
              }
            : undefined,
          spare_parts: spare_parts
            ? spare_parts.map((each) => {
                return { data: each, _id: each };
              })
            : undefined,
          requester_id: requester_id
            ? { data: requester_id, _id: requester_id }
            : undefined,
          inspector_id: inspector_id
            ? { data: inspector_id, _id: inspector_id }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      Logger.error('[PATCH] /apis/spare-parts/return-parts/:id : ' + error);
      throw error;
    }
  }
  async deleteEngineerReturnParts(id: string, user_id: string) {
    try {
      return await this.returnPartsModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        { new: true }
      );
    } catch (error) {
      Logger.error('[DELETE] /apis/spare-parts/return-parts/:id : ' + error);
      throw error;
    }
  }
}
