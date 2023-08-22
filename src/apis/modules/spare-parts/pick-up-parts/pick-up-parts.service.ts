import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PickUpParts } from 'src/model/schemas/spare-parts/pick-up-parts';
import { PickUpPartsDto } from './dto/pickUpParts.dto';

@Injectable()
export class PickUpPartService {
  constructor(
    @InjectModel('pick_up_parts')
    private readonly pickUpPartsModel: Model<PickUpParts>
  ) {}

  async getAllEngineerPickUpParts() {
    try {
      return await this.pickUpPartsModel.find({ is_active: true });
    } catch (error) {
      Logger.error(
        '[GET] /apis/engineering-base/engineer-pick-up-parts : ' + error
      );
      throw error;
    }
  }
  async getByIdEngineerPickUpParts(id: string) {
    try {
      return await this.pickUpPartsModel.findById(id);
    } catch (error) {
      Logger.error(
        '[GET] /apis/engineering-base/engineer-pick-up-parts/:id : ' + error
      );
    }
  }
  async createEngineerPickUpParts(
    createPickUpPartsDto: PickUpPartsDto,
    user_id: string
  ) {
    try {
      const {
        engineer_repair_id,
        projects_id,
        requester_id,
        spare_parts,
        inspector_id,
      } = createPickUpPartsDto;

      return await this.pickUpPartsModel.create({
        ...createPickUpPartsDto,
        projects_id: { data: projects_id, _id: projects_id },
        engineer_repair_id: {
          data: engineer_repair_id,
          _id: engineer_repair_id,
        },
        spare_parts: spare_parts
          ? spare_parts.map((each) => {
              return {
                data: each.spare_parts_id,
                _id: each.spare_parts_id,
                quantity: each.quantity,
              };
            })
          : undefined,
        requester_id: { data: requester_id, _id: requester_id },
        inspector_id: { data: inspector_id, _id: inspector_id },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      Logger.error(
        '[POST] /apis/engineering-base/engineer-pick-up-parts : ' + error
      );
      throw error;
    }
  }
  async updateEngineerPickUpParts(
    id: string,
    updatePickUpPartsDto: PickUpPartsDto,
    user_id: string
  ) {
    try {
      const {
        engineer_repair_id,
        projects_id,
        requester_id,
        spare_parts,
        inspector_id,
      } = updatePickUpPartsDto;
      return await this.pickUpPartsModel.findByIdAndUpdate(
        id,
        {
          ...updatePickUpPartsDto,
          projects_id: projects_id
            ? { data: projects_id, _id: projects_id }
            : undefined,
          engineer_repair_id: engineer_repair_id
            ? {
                data: engineer_repair_id,
                _id: engineer_repair_id,
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
      Logger.error(
        '[PATCH] /apis/engineering-base/engineer-pick-up-parts/:id : ' + error
      );
      throw error;
    }
  }
  async deleteEngineerPickUpParts(id: string, user_id: string) {
    try {
      return await this.pickUpPartsModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        { new: true }
      );
    } catch (error) {
      Logger.error(
        '[DELETE] /apis/engineering-base/engineer-pick-up-parts/:id : ' + error
      );
      throw error;
    }
  }
}
