import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DistrictResponse } from "src/model/response/DistrictResponse";
import { ProvinceResponse } from "src/model/response/ProvinceResponse";
import { SubDistrictResponse } from "src/model/response/SubDistrictResponse";

@Injectable()
export class LocationService {
  constructor(
    @InjectModel("provinces")
    private readonly provinceModel: Model<ProvinceResponse>,
    @InjectModel("districts")
    private readonly districtModel: Model<DistrictResponse>,
    @InjectModel("subdistricts")
    private readonly subDistrictModel: Model<SubDistrictResponse>
  ) {}

  async getAllProvince(): Promise<ProvinceResponse[]> {
    try {
      const result = await this.provinceModel.find();
      Logger.log("getAllProvince result : " + JSON.stringify(result));
      return result;
    } catch (error) {
      Logger.error("apis/location/province : " + error);
      throw error;
    }
  }

  async getAllDistrictByProvinceId(
    provinceId: string
  ): Promise<DistrictResponse[]> {
    try {
      const result = await this.districtModel.find({
        pv_id: provinceId,
      });

      Logger.log(
        "getAllDistrictByProvinceId result : " + JSON.stringify(result)
      );
      return result;
    } catch (error) {
      Logger.error("apis/location/district : " + error);
      throw error;
    }
  }

  async getAllSubDistrictByDistrictId(
    districtId: Number
  ): Promise<SubDistrictResponse[]> {
    try {
      const result = await this.subDistrictModel.aggregate([
        {
          $match: {
            dt_id: districtId,
          },
        },
      ]);
      Logger.log(
        "getAllSubDistrictByDistrictId result : " + JSON.stringify(result)
      );
      return result;
    } catch (error) {
      Logger.error("apis/location/subDistrict : " + error);
      throw error;
    }
  }
}
