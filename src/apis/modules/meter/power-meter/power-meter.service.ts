import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PowerMeter } from 'src/model/schemas/meter/power-meter';
import { CreatePowerMeterDto } from './dto/createPowerMeter.dto';
import { QueryPowerMeter } from './dto/queryPowerMeter.dto';
import { UpdatePowerMeterDto } from './dto/updatePowerMeter.dto';

@Injectable()
export class PowerMeterService {
  constructor(
    @InjectModel('power_meters')
    private readonly powerMeterModel: Model<PowerMeter>
  ) {}

  async getAllPowerMeters(query?: QueryPowerMeter): Promise<PowerMeter[]> {
    try {
      const { projects_id = '', house_id = '' } = query;
      return await this.powerMeterModel
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

  async getPowerMeterById(id: string): Promise<PowerMeter> {
    try {
      return await this.powerMeterModel
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

  async createPowerMeter(
    createPowerMeterDto: CreatePowerMeterDto,
    user_id: string
  ): Promise<PowerMeter> {
    try {
      const {
        projects_id,
        engineer_service_area_id,
        engineer_place_id,
        house_id,
      } = createPowerMeterDto;
      return await this.powerMeterModel.create({
        ...createPowerMeterDto,
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

  async updatePowerMeter(
    id: string,
    updatePowerMeterDto: UpdatePowerMeterDto,
    user_id: string
  ): Promise<PowerMeter> {
    try {
      const {
        projects_id,
        engineer_service_area_id,
        engineer_place_id,
        house_id,
      } = updatePowerMeterDto;
      return await this.powerMeterModel.findByIdAndUpdate(
        id,
        {
          ...updatePowerMeterDto,
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

  async deletePowerMeter(id: string, user_id: string): Promise<PowerMeter> {
    try {
      return await this.powerMeterModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}
