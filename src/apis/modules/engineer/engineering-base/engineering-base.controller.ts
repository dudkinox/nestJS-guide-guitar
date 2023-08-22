import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Query,
} from "@nestjs/common";
import {
  Body,
  Param,
  Post,
  Patch,
  Delete,
  Req,
} from "@nestjs/common/decorators";
import { ControllerResponse } from "src/model/response/ControllerResponse";
import { EngineerBaseService } from "./engineering-base.service";
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
import { ApiTags } from "@nestjs/swagger";
import { CreateUnitDto } from "./dto/unit/createUnit.dto";
import { UpdateUnitDto } from "./dto/unit/updateUnit.dto";
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from "src/constants/uconnectConstant";
import { QueryBaseDto } from "./dto/query/queryBase.dto";

@ApiTags("engineering service")
@Controller("engineering-base")
export class EngineeringBaseController {
  constructor(private engineerBaseService: EngineerBaseService) {}

  /*
    Place Controller Section
  */

  // Get Place Data
  @Get("/place")
  async getAllPlaceData(
    @Query() queryBaseDto: QueryBaseDto
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Get All Engineer Place Data",
        data: await this.engineerBaseService.getAllPlace(queryBaseDto),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAllPlaceData error : " + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Create Base Data
  @Post("/place")
  async createPlaceData(
    @Body() createPlaceDto: CreatePlaceDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Create Engineering-base place data.",
        data: await this.engineerBaseService.createPlace(
          createPlaceDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "createPlaceData error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Patch Update Base Data
  @Patch("/place/:id")
  async updatePlaceData(
    @Param("id") id: string,
    @Body() updatePlaceDto: UpdatePlaceDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Update engineering-place data by id.",
        data: await this.engineerBaseService.updatePlace(
          id,
          updatePlaceDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "updatePlaceData error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  //Delete place data
  @Delete("/place/:id")
  async deletePlaceData(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Delete Engineering-base place data.",
        data: await this.engineerBaseService.deletePlace(
          id,
          req.user.payload?._id
        ),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "deletePlaceData error : " + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /*
    Frequency Controller Section
  */

  // Get Frequency Data
  @Get("/frequency")
  async getAllFrequency(
    @Query() queryBaseDto: QueryBaseDto
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Get all frequency data.",
        data: await this.engineerBaseService.getAllFrequency(queryBaseDto),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAllFrequency error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Create Frequency Data
  @Post("/frequency")
  async createFrequency(
    @Body() createFrequencyDto: CreateFrequencyDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Create frequency data.",
        data: await this.engineerBaseService.createFrequency(
          createFrequencyDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "createFrequency error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Update Frequency Data
  @Patch("/frequency/:id")
  async updateFrequency(
    @Param("id") id: string,
    @Body() updateFrequencyDto: UpdateFrequencyDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Update frequency " + id + ".",
        data: await this.engineerBaseService.updateFrequency(
          id,
          updateFrequencyDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "updateFrequency error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // Delete Frequency Data
  @Delete("/frequency/:id")
  async deleteFrequency(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Delete frequency " + id + ".",
        data: this.engineerBaseService.deleteFrequency(
          id,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "deleteFrequency error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /*
    Checker Team Controller Section
  */

  @Get("/checker-team")
  async getAllCheckerTeam(
    @Query() queryBaseDto: QueryBaseDto
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Get All Checker Team",
        data: await this.engineerBaseService.getAllCheckerTeam(queryBaseDto),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAllCheckerTeam error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post("/checker-team")
  async createCheckerTeam(
    @Body() createCheckerTeamDto: CreateCheckerTeamDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Create Checker Team",
        data: await this.engineerBaseService.createCheckerTeam(
          createCheckerTeamDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "createCheckerTeamDto error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch("/checker-team/:id")
  async updateCheckerTeam(
    @Param("id") id: string,
    @Body() updateCheckerTeamDto: UpdateCheckerTeamDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Update Checker Team",
        data: await this.engineerBaseService.updateCheckerTeam(
          id,
          updateCheckerTeamDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "updateCheckerTeamDto error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete("/checker-team/:id")
  async deleteCheckerTeam(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Delete Checker Team",
        data: await this.engineerBaseService.deleteCheckerTeam(
          id,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "deleteCheckerTeam error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /*
    Service Area Controller Section
  */

  @Get("/service-area")
  async getAllServiceArea(
    @Query() queryBaseDto: QueryBaseDto
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Get All Service Area",
        data: await this.engineerBaseService.getAllServiceArea(queryBaseDto),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAllServiceArea error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post("/service-area")
  async createServiceArea(
    @Body() createServiceAreaDto: CreateServiceAreaDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Create Service Area Data",
        data: await this.engineerBaseService.createServiceArea(
          createServiceAreaDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "createServiceArea error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch("/service-area/:id")
  async updateServiceArea(
    @Param("id") id: string,
    @Body() updateServiceAreaDto: UpdateServiceAreaDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Update Service Area Data",
        data: await this.engineerBaseService.updateServiceArea(
          id,
          updateServiceAreaDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "updateServiceArea error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete("/service-area/:id")
  async deleteServiceArea(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Delete Service Area data.",
        data: await this.engineerBaseService.deleteServiceArea(
          id,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "deleteServiceArea error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /*
    Work Type Controller Section
  */

  @Get("/work-type")
  async getAllWorkType(
    @Query() queryBaseDto: QueryBaseDto
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Get All Work Type",
        data: await this.engineerBaseService.getAllWorkType(queryBaseDto),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAllWorkType error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post("/work-type")
  async createWorkType(
    @Body() createWorkTypeDto: CreateWorkTypeDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Create Work Type Data",
        data: await this.engineerBaseService.createWorkType(
          createWorkTypeDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "createWorkType error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch("/work-type/:id")
  async updateWorkType(
    @Param("id") id: string,
    @Body() updateWorkTypeDto: UpdateWorkTypeDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Update Work Type Data",
        data: await this.engineerBaseService.updateWorkType(
          id,
          updateWorkTypeDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "updateWorkType error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete("/work-type/:id")
  async deleteWorkType(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Delete Work Type Data.",
        data: await this.engineerBaseService.deleteWorkType(
          id,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "deleteWorkType error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /*
    System Type Controller Section
  */
  @Get("/system")
  async getAllSystem(
    @Query() queryBaseDto: QueryBaseDto
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Get All System Data.",
        data: await this.engineerBaseService.getAllSystem(queryBaseDto),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAllSystem error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post("/system")
  async createSystem(
    @Body() createSystemDto: CreateSystemDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Create System data.",
        data: await this.engineerBaseService.createSystem(
          createSystemDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "createSystem error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch("/system/:id")
  async updateSystem(
    @Param("id") id: string,
    @Body() updateSystemDto: UpdateSystemDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Update system data.",
        data: await this.engineerBaseService.updateSystem(
          id,
          updateSystemDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "updateSystem error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete("/system/:id")
  async deleteSystem(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Delete system data.",
        data: await this.engineerBaseService.deleteSystem(
          id,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "deleteSystem error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  /*
    Unit Controller Section
  */
  @Get("/unit")
  async getAllUnits(
    @Query() queryBaseDto: QueryBaseDto
  ): Promise<ControllerResponse> {
    try {
      Logger.log("getAllUnits start time : " + new Date().toLocaleString());

      return {
        description: "Get All Units Data.",
        data: await this.engineerBaseService.getAllUnit(queryBaseDto),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAllUnits error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post("/unit")
  async createUnit(
    @Body() createUnitDto: CreateUnitDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Create Unit data.",
        data: await this.engineerBaseService.createUnit(
          createUnitDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "createUnit error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch("/unit/:id")
  async updateUnit(
    @Param("id") id: string,
    @Body() updateUnitDto: UpdateUnitDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Update unit data.",
        data: await this.engineerBaseService.updateUnit(
          id,
          updateUnitDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "updateUnit error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete("/unit/:id")
  async deleteUnit(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: "Delete unit data.",
        data: await this.engineerBaseService.deleteUnit(
          id,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "deleteUnit error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
