import { HttpException, HttpStatus } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { CreateWorksheetCheckDto } from './dto/createWorksheetCheck.dto';
import { UpdateWorksheetCheckDto } from './dto/updateWorksheetCheck.dto';
import { EngineerWorksheetCheckService } from './worksheet-check.service';

@ApiTags('Engineering Worksheet Check')
@Controller('worksheet-check')
export class EngineerWorksheetCheckController {
  constructor(
    private engineerWorksheetCheckService: EngineerWorksheetCheckService
  ) { }

  @Get()
  async getAllWorksheetCheck(): Promise<ControllerResponse> {
    try {
      return {
        description: 'get all worksheet check.',
        data: await this.engineerWorksheetCheckService.getAllWorksheetCheck(),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getAllWorksheetCheck error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('/:id')
  async getByIdWorksheetCheck(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'get by id worksheet check',
        data: await this.engineerWorksheetCheckService.getByIdWorksheetCheck(
          id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getByIdWorksheetCheck error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  async createWorksheetCheck(
    @Body() createWorksheetCheckDto: CreateWorksheetCheckDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'create worksheet check.',
        data: await this.engineerWorksheetCheckService.createWorksheetCheck(
          createWorksheetCheckDto,
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
            description: 'createWorksheetCheck error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch('/:id')
  async updateWorksheetCheck(
    @Param('id') id: string,
    @Body() updateWorksheetCheckDto: UpdateWorksheetCheckDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'update worksheet check.',
        data: await this.engineerWorksheetCheckService.updateWorksheetCheck(
          id,
          updateWorksheetCheckDto,
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
            description: 'updateWorksheetCheck error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete('/:id')
  async deleteWorksheetCheck(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'delete worksheet check',
        data: await this.engineerWorksheetCheckService.deleteWorksheetCheck(
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
            description: 'deleteWorksheetCheck error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
