import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { EngineerRepair } from 'src/model/schemas/engineer/engineer-repair';
import { RepairQuery } from './dto/queryRepair.dto';
import { RepairDto } from './dto/Repair.dto';
import { UpdateRepairDto } from './dto/updateRepair.dto';
import { EngineerRepairService } from './engineer-repair.service';

@ApiTags('engineering repair')
@Controller('engineering-repairs')
export class EngineerRepairController {
  constructor(private engineerRepairService: EngineerRepairService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get All Repair',
    type: EngineerRepair,
  })
  async getAllEngineerRepairs(
    @Query() query: RepairQuery
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'getAllEngineerRepairs start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Get All Engineer Repairs Data.',
        data: await this.engineerRepairService.getAllEngineerRepairs(query),
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getAllEngineerRepairs error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Get Repair Data',
    type: EngineerRepair,
  })
  @ApiParam({
    name: 'id',
    description: 'repair_id',
    type: String,
    required: true,
  })
  async getEngineerRepairsById(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'getEngineerRepairsById start time : ' + new Date().toLocaleString()
      );
      return {
        description: 'Get Engineer Repairs Data By Id.',
        data: await this.engineerRepairService.getByIdEngineerRepairs(id),
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getEngineerRepairsById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: RepairDto,
    description: 'Request body for create repair.',
  })
  async createEngineerRepairs(
    @Body() repairsDto: RepairDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'createEngineerRepairs start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Create Engineer Repairs data.',
        data: await this.engineerRepairService.createEngineerRepairs(
          repairsDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'createEngineerRepairs error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch('/:id')
  @ApiBody({
    type: RepairDto,
    description: 'Request body for update repair.',
  })
  @ApiParam({
    name: 'id',
    description: 'repair_id',
    type: String,
    required: true,
  })
  async updateEngineerRepairs(
    @Param('id') id: string,
    @Body() repairsDto: UpdateRepairDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log(
      'updateEngineerRepairs start time : ' + new Date().toLocaleString()
    );

    try {
      return {
        description: 'Update Engineer Repairs data.',
        data: await this.engineerRepairService.updateEngineerRepairs(
          id,
          repairsDto,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description:
              'updateEngineerRepairs error : ' + JSON.stringify(error),
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    description: 'repair_id',
    type: String,
    required: true,
  })
  async deleteEngineerRepairs(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'deleteEngineerRepairs start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Delete Engineer Repairs data.',
        data: await this.engineerRepairService.deleteEngineerRepairs(
          id,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description:
              'deleteEngineerRepairs error : ' + JSON.stringify(error),
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
