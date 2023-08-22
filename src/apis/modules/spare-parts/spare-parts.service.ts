import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UconnectServiceConstant } from 'src/constants/uconnectConstant';
import { SparePart } from 'src/model/schemas/spare-parts/spare-parts';
import { CreateSparePartDto } from './dto/createSparePart.dto';
import { QuerySparePart } from './dto/querySparePart.dto';
import { UpdateSparePartDto } from './dto/updateSparePart.dto';

@Injectable()
export class SparePartsService {
  constructor(
    @InjectModel('spare_parts')
    private readonly sparePartModel: Model<SparePart>
  ) {}

  async getAllSpareParts(query?: QuerySparePart): Promise<SparePart[]> {
    try {
      const {
        quantity_max = UconnectServiceConstant.MAX,
        code = '',
        quantity_min = UconnectServiceConstant.MIN,
        title = '',
        unit_id = '',
        projects_id = '',
      } = query;
      return await this.sparePartModel
        .find({
          code: { $regex: code, $options: 'i' },
          title: { $regex: title, $options: 'i' },
          'engineer_unit_id._id': { $regex: unit_id, $options: 'i' },
          'projects_id._id': { $regex: projects_id, $options: 'i' },
          quantity: { $gte: quantity_min, $lte: quantity_max },
          is_active: true,
        })
        .populate(['projects_id.data', 'engineer_unit_id.data']);
    } catch (error) {
      throw error;
    }
  }

  async getSparePartById(id: string): Promise<SparePart> {
    try {
      return await this.sparePartModel
        .findById(id)
        .populate(['projects_id.data', 'engineer_unit_id.data']);
    } catch (error) {
      throw error;
    }
  }

  async createSparePart(
    createSparePart: CreateSparePartDto,
    id_user: string
  ): Promise<SparePart> {
    try {
      const { projects_id, engineer_unit_id } = createSparePart;
      return await this.sparePartModel.create({
        ...createSparePart,
        projects_id: { data: projects_id, _id: projects_id },
        engineer_unit_id: { data: engineer_unit_id, _id: engineer_unit_id },
        created_by: { data: id_user, _id: id_user },
        updated_by: { data: id_user, _id: id_user },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateSparePart(
    id: string,
    updateSparePart: UpdateSparePartDto,
    id_user: string
  ): Promise<SparePart> {
    try {
      const { projects_id, engineer_unit_id } = updateSparePart;
      return await this.sparePartModel.findByIdAndUpdate(
        id,
        {
          ...updateSparePart,
          projects_id: projects_id
            ? { data: projects_id, _id: projects_id }
            : undefined,
          engineer_unit_id: engineer_unit_id
            ? { data: engineer_unit_id, _id: engineer_unit_id }
            : undefined,
          updated_by: { data: id_user, _id: id_user },
        },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteSparePart(id: string, id_user: string): Promise<SparePart> {
    try {
      return await this.sparePartModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: { data: id_user, _id: id_user },
        },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}
