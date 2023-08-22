import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ControllerResponse } from "src/model/response/ControllerResponse";
import { EngineeringPlansService } from "./engineering-plans.service";
import { CreateEngineerPlanDto } from "./dto/createEngineerPlans.dto";
import { UpdateEngineerPlanDto } from "./dto/updateEngineerPlans.dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from "src/constants/uconnectConstant";
import { PlansQuery } from "./dto/engineerPlanQuery.dto";
import { Query } from "@nestjs/common/decorators";

@ApiTags("Engineering Plans")
@Controller("engineering-plans")
export class EngineeringPlansController {
  constructor(private readonly engineerPlansService: EngineeringPlansService) { }

  // engineering-plans?query
  @Get()
  async GetAllEngineerPlans(@Query() query: PlansQuery): Promise<ControllerResponse> {
    try {
      return {
        data: await this.engineerPlansService.getAllPlans(query),
        description: "Get all list of engineer plans.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "GetAllEngineerPlans error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // engineering-plans/Mongo-id of plans
  @Get("/:id")
  @ApiTags("Engineering Plans")
  @ApiParam({
    name: "id",
    type: String,
    required: true,
    example: "กรอกเลข project id",
  })
  async GetEngineerPlansByProjectId(
    @Param("id") id: string
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.engineerPlansService.getPlansById(id),
        description: "Get engineer plans by project id.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description:
              "GetEngineerPlansByProjectId error : " + error.toString(),
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  async createEngineerPlan(
    @Body() createEngineerPlanDto: CreateEngineerPlanDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.engineerPlansService.createPlan(
          createEngineerPlanDto,
          req.user.payload?._id
        ),
        description: "Create Engineer Plan",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "createEngineerPlan error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(":id")
  async updateEngineerPlan(
    @Param("id") id: string,
    @Body() updateEngineerPlan: UpdateEngineerPlanDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.engineerPlansService.updatePlan(
          id,
          updateEngineerPlan,
          req.user.payload?._id
        ),
        description: "Update Engineer Plan Detail",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "updateEngineerPlan error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(":id")
  async deleteEngineerPlan(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.engineerPlansService.deletePlan(
          id,
          req.user.payload?._id
        ),
        description: "Delete Engineer Plan By Id.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "deleteEngineerPlan error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
