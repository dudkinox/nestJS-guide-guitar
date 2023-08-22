import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  EngineerCheckerTeam,
  EngineerFrequency,
  EngineerPlace,
  EngineerServiceArea,
  EngineerSystem,
  EngineerUnit,
  EngineerWorkType,
} from "src/model/schemas/engineer";

import { CreatePlaceDto } from "./dto/place/createPlace.dto";
import { UpdatePlaceDto } from "./dto/place/updatePlace.dto";
import { CreateFrequencyDto } from "./dto/frequency/createFrequency.dto";
import { UpdateFrequencyDto } from "./dto/frequency/updateFrequency.dto";
import { CreateCheckerTeamDto } from "./dto/checkerTeam/createCheckerTeam.dto";
import { UpdateCheckerTeamDto } from "./dto/checkerTeam/updateCheckerTeam.dto";
import { CreateServiceAreaDto } from "./dto/serviceArea/createServiceArea.dto";
import { UpdateServiceAreaDto } from "./dto/serviceArea/updateServiceArea.dto";
import { CreateWorkTypeDto } from "./dto/workType/createWorkType.dto";
import { UpdateWorkTypeDto } from "./dto/workType/updateWorkType.dto";
import { CreateSystemDto } from "./dto/system/createSystem.dto";
import { UpdateSystemDto } from "./dto/system/updateSystem.dto";
import { UpdateUnitDto } from "./dto/unit/updateUnit.dto";
import { CreateUnitDto } from "./dto/unit/createUnit.dto";
import { QueryBaseDto } from "./dto/query/queryBase.dto";

@Injectable()
export class EngineerBaseService {
  constructor(
    @InjectModel("places") private readonly placeModel: Model<EngineerPlace>,
    @InjectModel("checker_teams")
    private readonly checkerTeamModel: Model<EngineerCheckerTeam>,
    @InjectModel("frequencies")
    private readonly frequencyModel: Model<EngineerFrequency>,
    @InjectModel("service_areas")
    private readonly serviceAreaModel: Model<EngineerServiceArea>,
    @InjectModel("work_types")
    private readonly workTypeModel: Model<EngineerWorkType>,
    @InjectModel("systems") private readonly systemModel: Model<EngineerSystem>,
    @InjectModel("units") private readonly unitsModel: Model<EngineerUnit>
  ) {}

  /* 
    Engineering Place Service Function Section
  */

  // Function : Create data in places table.
  async createPlace(createPlaceDto: CreatePlaceDto, user_id: string) {
    try {
      const { projects_id, engineer_service_area_id } = createPlaceDto;
      return await this.placeModel.create({
        ...createPlaceDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        engineer_service_area_id: {
          data: engineer_service_area_id,
          _id: engineer_service_area_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (err) {
      throw err;
    }
  }

  // Function : Get all places data
  async getAllPlace(queryBaseDto?: QueryBaseDto) {
    try {
      const { engineer_service_area_id = "", projects_id = "" } = queryBaseDto;
      return await this.placeModel
        .find({
          is_active: true,
          "engineer_service_area_id._id": { $regex: engineer_service_area_id },
          "projects_id._id": { $regex: projects_id },
        })
        .populate(["engineer_service_area_id.data", "projects_id.data"]);
    } catch (error) {
      throw error;
    }
  }

  // Function : Update data using id data and updated data.
  async updatePlace(
    id: string,
    updatePlaceDto: UpdatePlaceDto,
    user_id: string
  ) {
    try {
      const { projects_id, engineer_service_area_id } = updatePlaceDto;

      const place = await this.placeModel.findByIdAndUpdate(
        id,
        {
          ...updatePlaceDto,
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
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
      return place.save();
    } catch (error) {
      throw error;
    }
  }

  // Function : Delete data using id data.
  async deletePlace(id: string, user_id: string) {
    try {
      return await this.placeModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        {
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /* 
    Engineer Frequency Service Function Section
  */

  // Create Frequency Data
  async createFrequency(
    createFrequencyDto: CreateFrequencyDto,
    user_id: string
  ) {
    try {
      const { projects_id } = createFrequencyDto;
      return await this.frequencyModel.create({
        ...createFrequencyDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  // Get All Data Frequency
  async getAllFrequency(queryBaseDto?: QueryBaseDto) {
    try {
      const { projects_id = "" } = queryBaseDto;

      return await this.frequencyModel
        .find({
          is_active: true,
          "projects_id._id": { $regex: projects_id },
        })
        .populate(["projects_id.data"]);
    } catch (error) {
      throw error;
    }
  }

  // Update Frequency
  async updateFrequency(
    id: string,
    updateFrequencyDto: UpdateFrequencyDto,
    user_id: string
  ) {
    try {
      const { projects_id } = updateFrequencyDto;

      return await this.frequencyModel.findByIdAndUpdate(
        id,
        {
          ...updateFrequencyDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
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

  // Delete Frequency
  async deleteFrequency(id: string, user_id: string) {
    try {
      return await this.frequencyModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /* 
    Engineer Checker Team Service Function Section
  */

  async createCheckerTeam(
    createCheckerTeamDto: CreateCheckerTeamDto,
    user_id: string
  ) {
    try {
      const {
        projects_id,
        first_checker,
        second_checker,
        third_checker,
        fourth_checker,
        fifth_checker,
      } = createCheckerTeamDto;
      return await this.checkerTeamModel.create({
        ...createCheckerTeamDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        first_checker: first_checker
          ? first_checker.map((each) => {
              return { data: each, _id: each };
            })
          : undefined,
        second_checker: second_checker
          ? second_checker.map((each) => {
              return { data: each, _id: each };
            })
          : undefined,
        third_checker: third_checker
          ? third_checker.map((each) => {
              return { data: each, _id: each };
            })
          : undefined,
        fourth_checker: fourth_checker
          ? fourth_checker.map((each) => {
              return { data: each, _id: each };
            })
          : undefined,
        fifth_checker: fifth_checker
          ? fifth_checker.map((each) => {
              return { data: each, _id: each };
            })
          : undefined,
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllCheckerTeam(queryBaseDto?: QueryBaseDto) {
    try {
      const { projects_id = "" } = queryBaseDto;

      return await this.checkerTeamModel
        .find({ is_active: true, "projects_id._id": { $regex: projects_id } })
        .populate([
          "projects_id.data",
          "first_checker.data",
          "second_checker.data",
          "third_checker.data",
          "fourth_checker.data",
          "fifth_checker.data",
          "created_by.data",
          "updated_by.data",
        ]);
    } catch (error) {
      throw error;
    }
  }

  async updateCheckerTeam(
    id: string,
    updateCheckerTeamDto: UpdateCheckerTeamDto,
    user_id: string
  ) {
    try {
      const {
        projects_id,
        first_checker,
        second_checker,
        third_checker,
        fourth_checker,
        fifth_checker,
      } = updateCheckerTeamDto;
      return await this.checkerTeamModel.findByIdAndUpdate(
        id,
        {
          ...updateCheckerTeamDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
              }
            : undefined,
          first_checker: first_checker
            ? first_checker.map((each) => {
                return { data: each, _id: each };
              })
            : undefined,
          second_checker: second_checker
            ? second_checker.map((each) => {
                return { data: each, _id: each };
              })
            : undefined,
          third_checker: third_checker
            ? third_checker.map((each) => {
                return { data: each, _id: each };
              })
            : undefined,
          fourth_checker: fourth_checker
            ? fourth_checker.map((each) => {
                return { data: each, _id: each };
              })
            : undefined,
          fifth_checker: fifth_checker
            ? fifth_checker.map((each) => {
                return { data: each, _id: each };
              })
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteCheckerTeam(id: string, user_id: string) {
    try {
      return await this.checkerTeamModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  /* 
    Engineer Service Area Function Section
  */

  async createServiceArea(
    createServiceAreaDto: CreateServiceAreaDto,
    user_id: string
  ) {
    try {
      const { projects_id } = createServiceAreaDto;
      return await this.serviceAreaModel.create({
        ...createServiceAreaDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllServiceArea(queryBaseDto?: QueryBaseDto) {
    try {
      const { projects_id = "" } = queryBaseDto;

      return await this.serviceAreaModel
        .find({
          is_active: true,
          "projects_id._id": { $regex: projects_id },
        })
        .populate(["projects_id.data"]);
    } catch (error) {
      throw error;
    }
  }
  async updateServiceArea(
    id: string,
    updateServiceAreaDto: UpdateServiceAreaDto,
    user_id: string
  ) {
    try {
      const { projects_id } = updateServiceAreaDto;

      return await this.serviceAreaModel.findByIdAndUpdate(
        id,
        {
          ...updateServiceAreaDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
              }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteServiceArea(id: string, user_id: string) {
    try {
      return await this.serviceAreaModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_id: user_id },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  /* 
    Engineer Work Type Service Function Section
  */

  async createWorkType(createWorkTypeDto: CreateWorkTypeDto, user_id: string) {
    try {
      const { projects_id } = createWorkTypeDto;
      return await this.workTypeModel.create({
        ...createWorkTypeDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllWorkType(queryBaseDto?: QueryBaseDto) {
    try {
      const { projects_id = "" } = queryBaseDto;

      return await this.workTypeModel
        .find({ is_active: true, "projects_id._id": { $regex: projects_id } })
        .populate(["projects_id.data"]);
      // .populate('projects_id');
    } catch (error) {
      throw error;
    }
  }
  async updateWorkType(
    id: string,
    updateWorkTypeDto: UpdateWorkTypeDto,
    user_id: string
  ) {
    try {
      const { projects_id } = updateWorkTypeDto;

      return await this.workTypeModel.findByIdAndUpdate(
        id,
        {
          ...updateWorkTypeDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
              }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteWorkType(id: string, user_id: string) {
    try {
      return await this.workTypeModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  /* 
    Engineer System Service Function Section
  */

  async createSystem(createSystemDto: CreateSystemDto, user_id: string) {
    try {
      const { projects_id } = createSystemDto;
      return await this.systemModel.create({
        ...createSystemDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllSystem(queryBaseDto?: QueryBaseDto) {
    try {
      const { projects_id = "" } = queryBaseDto;

      return await this.systemModel
        .find({ is_active: true, "projects_id._id": { $regex: projects_id } })
        .populate(["projects_id.data"]);
    } catch (error) {
      throw error;
    }
  }
  async updateSystem(
    id: string,
    updateSystemDto: UpdateSystemDto,
    user_id: string
  ) {
    try {
      const { projects_id } = updateSystemDto;
      return await this.systemModel.findByIdAndUpdate(
        id,
        {
          ...updateSystemDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
              }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteSystem(id: string, user_id: string) {
    try {
      return await this.systemModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  /* 
    Engineer Unit Service Function Section
  */

  async createUnit(createUnitDto: CreateUnitDto, user_id: string) {
    try {
      const { projects_id } = createUnitDto;
      return await this.unitsModel.create({
        ...createUnitDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllUnit(queryBaseDto?: QueryBaseDto) {
    try {
      const { projects_id = "" } = queryBaseDto;

      type ProjectFilter = {
        is_active: boolean;
        projects_id?: {
          data: string;
          _id: string;
        };
      };

      let filter: ProjectFilter = { is_active: true };

      if (projects_id) {
        filter.projects_id = {
          data: projects_id,
          _id: projects_id,
        };
      }

      return await this.unitsModel.find({ filter });
    } catch (error) {
      throw error;
    }
  }
  async updateUnit(id: string, updateUnitDto: UpdateUnitDto, user_id: string) {
    try {
      const { projects_id } = updateUnitDto;
      return await this.unitsModel.findByIdAndUpdate(
        id,
        {
          ...updateUnitDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
              }
            : projects_id,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }
  async deleteUnit(id: string, user_id: string) {
    try {
      return await this.unitsModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
