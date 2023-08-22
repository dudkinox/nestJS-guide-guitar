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
  ApiBody,
  ApiDefaultResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ControllerResponse } from "src/model/response/ControllerResponse";
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from "src/constants/uconnectConstant";
import { RolesService } from "./roles.service";
import { Roles } from "src/model/schemas/roles";
import { RolesDto } from "./dto/roles.dto";

@ApiTags("roles-service")
@Controller("roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "Get all roles data.",
    type: Roles,
  })
  @ApiDefaultResponse({ description: "Get all roles data." })
  async getAllRoles(): Promise<ControllerResponse> {
    Logger.log("getAllRoles start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.rolesService.getAllRoles(),
        description: "Get all roles data.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "getAllRoles error : " + error,
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
    description: "Get single roles data by id.",
    type: Roles,
  })
  @ApiParam({
    name: "id",
    description: "Roles id.",
    type: String,
    required: true,
    example: "5f9b3b3b9b9b9b9b9b9b9b9b",
  })
  @ApiDefaultResponse({ description: "Get single roles data by id." })
  async getRolesById(@Param("id") id: string): Promise<ControllerResponse> {
    Logger.log("getRolesById start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.rolesService.getRolesById(id),
        description: "Get single roles data by id.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "getRolesById error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: Roles,
    description: "Request body for creating a new roles.",
  })
  async createRoles(
    @Body() createRolesDto: RolesDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log("createRoles start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.rolesService.createRoles(
          createRolesDto,
          req.user.payload?._id
        ),
        description: "Create roles request.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "Create roles request error : " + error,
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
    description: "Roles id.",
    type: String,
    required: true,
    example: "5f9b3b3b9b9b9b9b9b9b9b9b",
  })
  @ApiBody({
    type: RolesDto,
    description: "Request body for update a exist roles.",
  })
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserEmployeeDto: RolesDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.rolesService.updateUser(
          id,
          updateUserEmployeeDto,
          req.user.payload?._id
        ),
        description: "Update roles by id.",
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "Update roles by id error : " + err,
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
    example: "5f9b3b3b9b9b9b9b9b9b9b9b",
  })
  @ApiDefaultResponse({ description: "Request delete for a exist roles." })
  async deleteUser(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.rolesService.deleteUser(id, req.user.payload?._id),
        description: "Delete account.",
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: "Delete account error : " + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
