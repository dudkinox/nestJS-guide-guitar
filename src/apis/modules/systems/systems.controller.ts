import {
  Controller,
  Get,
  Logger,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Body,
  Req,
  Patch,
  Delete,
} from "@nestjs/common";
import {
  ApiResponse,
  ApiTags,
  ApiDefaultResponse,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { SystemsService } from "./systems.service";
import { SystemsDto } from "./dto/systems.dto";
import { ControllerResponse } from "src/model/response/ControllerResponse";
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from "src/constants/uconnectConstant";
import { Systems } from "src/model/schemas/systems";

@ApiTags("systems-service")
@Controller("systems")
export class SystemsController {
  constructor(private readonly systemsService: SystemsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "Get all roles data.",
    type: SystemsDto,
  })
  @ApiDefaultResponse({ description: "Get all roles data." })
  async getAllSystems(): Promise<ControllerResponse> {
    Logger.log("getAllRoles start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.systemsService.getAllSystems(),
        description: "Get all roles data.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.SYSTEM_SERVICE,
            description: "getAllSystems error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get("/:id")
  @ApiResponse({
    status: 200,
    description: "Get single systems data by id.",
    type: Systems,
  })
  @ApiParam({
    name: "id",
    description: "Systems id.",
    type: Number,
    required: true,
    example: 456424894894,
  })
  @ApiDefaultResponse({ description: "Get single systems data by id." })
  async getSystemsById(@Param("id") id: string): Promise<ControllerResponse> {
    Logger.log("getSystemsById start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.systemsService.getSystemsById(id),
        description: "Get single systems data by id.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.SYSTEM_SERVICE,
            description: "getSystemsById error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: Systems,
    description: "Request body for creating a new systems.",
  })
  async createSystems(
    @Body() createSystemsDto: SystemsDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log("createSystems start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.systemsService.createSystems(
          createSystemsDto,
          req.user.payload?._id
        ),
        description: "Create systems request.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.SYSTEM_SERVICE,
            description: "Create systems request error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch("/:id")
  @ApiParam({
    name: "id",
    description: "Systems id.",
    type: String,
    required: true,
    example: 4564132456,
  })
  @ApiBody({
    type: SystemsDto,
    description: "Request body for update a exist systems.",
  })
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserEmployeeDto: SystemsDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.systemsService.updateUser(
          id,
          updateUserEmployeeDto,
          req.user.payload?._id
        ),
        description: "Update systems by id.",
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.SYSTEM_SERVICE,
            description: "Update systems by id error : " + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete("/:id")
  @ApiParam({
    name: "id",
    description: "User id.",
    type: String,
    required: true,
    example: 4564654465,
  })
  @ApiDefaultResponse({ description: "Request delete for a exist systems." })
  async deleteUser(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.systemsService.deleteUser(id, req.user.payload?._id),
        description: "Delete systems.",
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.SYSTEM_SERVICE,
            description: "Delete systems error : " + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
