import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WaterMeter } from 'src/model/schemas/meter/water-meter';
import { CreateWaterMeterDto } from './dto/createWaterMeter.dto';
import { QueryWaterMeter } from './dto/queryWaterMeter.dto';
import { UpdateWaterMeterDto } from './dto/updateWaterMeter.dto';

@Injectable()
export class WaterMeterService {
  constructor(
    @InjectModel('water_meters')
    private readonly waterMeterModel: Model<WaterMeter>
  ) {}

  async getAllWaterMeters(query?: QueryWaterMeter): Promise<WaterMeter[]> {
    try {
      const { projects_id = '', house_id = '' } = query;
      return await this.waterMeterModel
        .find({
          'projects_id._id': { $regex: projects_id },
          'house_id._id': { $regex: house_id },
          is_active: true,
        })
        .populate([
          'projects_id.data',
          'engineer_service_area_id.data',
          'engineer_place_id.data',
          'house_id.data',
          'created_by.data',
          'updated_by.data',
        ]);
    } catch (error) {
      throw error;
    }
  }

  async getWaterMeterById(id: string): Promise<WaterMeter> {
    try {
      return await this.waterMeterModel
        .findById(id)
        .populate([
          'projects_id.data',
          'engineer_service_area_id.data',
          'engineer_place_id.data',
          'house_id.data',
          'created_by.data',
          'updated_by.data',
        ]);
    } catch (error) {
      throw error;
    }
  }

  async createWaterMeter(
    createWaterMeterDto: CreateWaterMeterDto,
    user_id: string
  ): Promise<WaterMeter> {
    try {
      const {
        projects_id,
        engineer_service_area_id,
        engineer_place_id,
        house_id,
      } = createWaterMeterDto;
      return await this.waterMeterModel.create({
        ...createWaterMeterDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        engineer_service_area_id: {
          data: engineer_service_area_id,
          _id: engineer_service_area_id,
        },
        engineer_place_id: {
          data: engineer_place_id,
          _id: engineer_place_id,
        },
        house_id: {
          data: house_id,
          _id: house_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateWaterMeter(
    id: string,
    updateWaterMeterDto: UpdateWaterMeterDto,
    user_id: string
  ): Promise<WaterMeter> {
    try {
      const {
        projects_id,
        engineer_service_area_id,
        engineer_place_id,
        house_id,
      } = updateWaterMeterDto;
      return await this.waterMeterModel.findByIdAndUpdate(
        id,
        {
          ...updateWaterMeterDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
              }
            : undefined,
          engineer_service_area_id: engineer_service_area_id
            ? {
                data: engineer_service_area_id,
                _id: engineer_service_area_id,
              }
            : undefined,
          engineer_place_id: engineer_place_id
            ? {
                data: engineer_place_id,
                _id: engineer_place_id,
              }
            : undefined,
          house_id: house_id
            ? {
                data: house_id,
                _id: house_id,
              }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteWaterMeter(id: string, user_id: string): Promise<WaterMeter> {
    try {
      return await this.waterMeterModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}
