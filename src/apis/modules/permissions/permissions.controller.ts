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
import { PermissionsService } from "./permissions.service";
import { PermissionsDto } from "./dto/permissions.dto";
import { ControllerResponse } from "src/model/response/ControllerResponse";
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from "src/constants/uconnectConstant";
import { PermissionsModel } from "src/model/schemas/permissions";

@ApiTags("permissions-service")
@Controller("permissions")
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: "Get all permissions data.",
    type: PermissionsDto,
  })
  @ApiDefaultResponse({ description: "Get all permissions data." })
  async getAllPermissions(): Promise<ControllerResponse> {
    Logger.log("getAllPermissions start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.permissionsService.getAllPermissions(),
        description: "Get all permissions data.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.PERMISSIONS_SERVICE,
            description: "getAllPermissions error : " + error,
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
    description: "Get single permission data by id.",
    type: PermissionsModel,
  })
  @ApiParam({
    name: "id",
    description: "permission id.",
    type: Number,
    required: true,
    example: 456424894894,
  })
  @ApiDefaultResponse({ description: "Get single permission data by id." })
  async getPermissionsById(
    @Param("id") id: string
  ): Promise<ControllerResponse> {
    Logger.log(
      "getPermissionsById start time : " + new Date().toLocaleString()
    );

    try {
      return {
        data: await this.permissionsService.getPermissionsById(id),
        description: "Get single permission data by id.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.PERMISSIONS_SERVICE,
            description: "getPermissionsById error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: PermissionsModel,
    description: "Request body for creating a new permission.",
  })
  async createPermissions(
    @Body() createPermissionsDto: PermissionsDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log("createPermissions start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.permissionsService.createPermissions(
          createPermissionsDto,
          req.user.payload?._id
        ),
        description: "Create permission request.",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.PERMISSIONS_SERVICE,
            description: "Create permission request error : " + error,
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
    description: "Permissions id.",
    type: String,
    required: true,
    example: 4564132456,
  })
  @ApiBody({
    type: PermissionsDto,
    description: "Request body for update a exist permission.",
  })
  async updateUser(
    @Param("id") id: string,
    @Body() updateUserEmployeeDto: PermissionsDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.permissionsService.updateUser(
          id,
          updateUserEmployeeDto,
          req.user.payload?._id
        ),
        description: "Update permission by id.",
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.PERMISSIONS_SERVICE,
            description: "Update permission by id error : " + err,
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
    description: "permissions id.",
    type: String,
    required: true,
    example: 4564654465,
  })
  @ApiDefaultResponse({
    description: "Request delete for a exist permissions.",
  })
  async deleteUser(
    @Param("id") id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.permissionsService.deletePermissions(
          id,
          req.user.payload?._id
        ),
        description: "Delete permissions.",
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.PERMISSIONS_SERVICE,
            description: "Delete permissions error : " + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
