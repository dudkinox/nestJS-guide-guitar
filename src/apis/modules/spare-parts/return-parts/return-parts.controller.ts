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
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { CreateReturnPartsDto } from './dto/createReturnParts.dto';
import { UpdateReturnPartsDto } from './dto/updateReturnParts.dto';
import { ReturnPartService } from './return-parts.service';

@ApiTags('return-parts')
@Controller()
export class ReturnPartsController {
  constructor(private returnPartService: ReturnPartService) {}

  @Get()
  async getAllEngineerReturnParts(): Promise<ControllerResponse> {
    try {
      Logger.log(
        'getAllEngineerReturnParts start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Get All Engineer Pick Up Parts Data.',
        data: await this.returnPartService.getAllEngineerReturnParts(),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getAllEngineerReturnParts error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  async getEngineerReturnPartsById(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'getEngineerReturnPartsById start time : ' + new Date().toLocaleString()
      );
      return {
        description: 'Get Engineer Pick Up Parts Data By Id.',
        data: await this.returnPartService.getByIdEngineerReturnParts(id),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getEngineerReturnPartsById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  async createEngineerReturnParts(
    @Body() createReturnPartsDto: CreateReturnPartsDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'createEngineerReturnParts start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Create Engineer Pick Up Parts data.',
        data: await this.returnPartService.createEngineerReturnParts(
          createReturnPartsDto,
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
            description: 'createEngineerReturnParts error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id')
  async updateEngineerReturnParts(
    @Param('id') id: string,
    @Body() updateReturnPartsDto: UpdateReturnPartsDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log(
      'updateEngineerReturnParts start time : ' + new Date().toLocaleString()
    );

    try {
      return {
        description: 'Update Engineer Pick Up Parts data.',
        data: await this.returnPartService.updateEngineerReturnParts(
          id,
          updateReturnPartsDto,
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
              'updateEngineerReturnParts error : ' + JSON.stringify(error),
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  async deleteEngineerReturnParts(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'deleteEngineerReturnParts start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Delete Engineer Pick Up Parts data.',
        data: await this.returnPartService.deleteEngineerReturnParts(
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
              'deleteEngineerReturnParts error : ' + JSON.stringify(error),
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
