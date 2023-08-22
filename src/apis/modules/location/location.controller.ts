import { Controller, Get, Logger, Param } from "@nestjs/common";
import {
  ApiDefaultResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ProvinceResponse } from "src/model/response/ProvinceResponse";
import { LocationService } from "./location.service";
import { ControllerResponse } from "src/model/response/ControllerResponse";
import { DistrictResponse } from "src/model/response/DistrictResponse";
import { SubDistrictResponse } from "src/model/response/SubDistrictResponse";

@ApiTags("location")
@Controller("location")
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get("province")
  @ApiResponse({
    status: 200,
    description: "Get all province data.",
    type: ProvinceResponse,
  })
  @ApiDefaultResponse({ description: "Get all province." })
  async getAllProvince(): Promise<ControllerResponse> {
    Logger.log("getAllProvince start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.locationService.getAllProvince(),
        description: "Get all province.",
      };
    } catch (error) {
      return { data: null, description: "getAllUsers error : " + error };
    }
  }

  @Get("district/:provinceId")
  @ApiResponse({
    status: 200,
    description: "Get all district data by province id.",
    type: DistrictResponse,
  })
  @ApiParam({ name: "provinceId", type: Number, example: 1 })
  @ApiDefaultResponse({ description: "Get all district data by province id." })
  async getAllDistrictByProvinceId(
    @Param("provinceId") provinceId: string
  ): Promise<ControllerResponse> {
    Logger.log(
      "getAllDistrictByProvinceId start time : " + new Date().toLocaleString()
    );

    try {
      return {
        data: await this.locationService.getAllDistrictByProvinceId(provinceId),
        description: "Get all district data by province id.",
      };
    } catch (error) {
      return {
        data: null,
        description: "getAllDistrictByProvinceId error : " + error,
      };
    }
  }

  @Get("sub-district/:districtId")
  @ApiResponse({
    status: 200,
    description: "Get all sub-district data by district id.",
    type: SubDistrictResponse,
  })
  @ApiParam({ name: "districtId", type: Number, example: 1 })
  @ApiDefaultResponse({
    description: "Get all sub-district data by district id.",
  })
  async getAllSubDistrictByDistrictId(
    @Param("districtId") districtId: number
  ): Promise<ControllerResponse> {
    Logger.log(
      "getAllSubDistrictByDistrictId start time : " +
        new Date().toLocaleString()
    );

    try {
      return {
        data: await this.locationService.getAllSubDistrictByDistrictId(
          districtId
        ),
        description: "Get all sub-district data by district id.",
      };
    } catch (error) {
      return {
        data: null,
        description: "getAllSubDistrictByDistrictId error : " + error,
      };
    }
  }
}
