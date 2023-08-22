import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { House } from 'src/model/schemas/house';
import { CreateHouseDto } from './dto/createHouse.dto';
import { QueryHouse } from './dto/queryHouse.dto';
import { UpdateHouseDto } from './dto/updateHouse.dto';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel('houses') private readonly houseModel: Model<House>
  ) {}

  async getAllHouse(query?: QueryHouse) {
    try {
      const {
        projects_id = '',
        engineer_place_id = '',
        engineer_service_area_id = '',
      } = query;
      return await this.houseModel
        .find({
          'projects_id._id': { $regex: projects_id },
          'engineer_place_id._id': { $regex: engineer_place_id },
          'engineer_service_area_id._id': { $regex: engineer_service_area_id },
          is_active: true,
        })
        .populate([
          'projects_id.data',
          'engineer_service_area_id.data',
          'engineer_place_id.data',
          'residents.user_residents_id.data',
          'invoice_subdistrict_id.data',
          'invoice_district_id.data',
          'invoice_province_id.data',
        ]);
    } catch (error) {
      throw error;
    }
  }

  async getHouseById(id: string) {
    try {
      return await this.houseModel
        .findById(id)
        .populate([
          'projects_id.data',
          'engineer_service_area_id.data',
          'engineer_place_id.data',
          'residents.user_residents_id.data',
          'invoice_subdistrict_id.data',
          'invoice_district_id.data',
          'invoice_province_id.data',
        ]);
    } catch (error) {
      throw error;
    }
  }

  async createHouse(
    createHouseDto: CreateHouseDto,
    user_id: string
  ): Promise<House> {
    try {
      const {
        projects_id,
        engineer_service_area_id,
        engineer_place_id,
        residents,
        invoice_subdistrict_id,
        invoice_district_id,
        invoice_province_id,
      } = createHouseDto;
      return await this.houseModel.create({
        ...createHouseDto,
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
        residents: residents
          ? residents.map((each) => {
              return {
                user_residents_id: {
                  data: each.user_residents_id,
                  _id: each.user_residents_id,
                },
                residents_role: each.user_residents_id,
              };
            })
          : [],
        invoice_subdistrict_id: {
          data: invoice_subdistrict_id,
          _id: invoice_subdistrict_id,
        },
        invoice_district_id: {
          data: invoice_district_id,
          _id: invoice_district_id,
        },
        invoice_province_id: {
          data: invoice_province_id,
          _id: invoice_province_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateHouse(
    id: string,
    updateHouseDto: UpdateHouseDto,
    user_id: string
  ) {
    try {
      const {
        projects_id,
        engineer_service_area_id,
        engineer_place_id,
        residents,
        invoice_subdistrict_id,
        invoice_district_id,
        invoice_province_id,
      } = updateHouseDto;
      return await this.houseModel.findByIdAndUpdate(id, {
        ...updateHouseDto,
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
        residents: residents
          ? residents.map((each) => {
              return {
                user_residents_id: {
                  data: each.user_residents_id,
                  _id: each.user_residents_id,
                },
                residents_role: each.user_residents_id,
              };
            })
          : undefined,
        invoice_subdistrict_id: invoice_subdistrict_id
          ? {
              data: invoice_subdistrict_id,
              _id: invoice_subdistrict_id,
            }
          : undefined,
        invoice_district_id: invoice_district_id
          ? {
              data: invoice_district_id,
              _id: invoice_district_id,
            }
          : undefined,
        invoice_province_id: invoice_province_id
          ? {
              data: invoice_province_id,
              _id: invoice_province_id,
            }
          : undefined,
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteHouse(id: string, user_id: string) {
    try {
      return await this.houseModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }
}
