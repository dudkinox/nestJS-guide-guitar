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
import { PickUpPartsDto } from './dto/pickUpParts.dto';
import { PickUpPartService } from './pick-up-parts.service';

@ApiTags('pick-up-parts-module')
@Controller()
export class PickUpPartController {
  constructor(private pickUpPartService: PickUpPartService) {}

  @Get()
  async getAllEngineerPickUpParts(): Promise<ControllerResponse> {
    try {
      Logger.log(
        'getAllEngineerPickUpParts start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Get All Engineer Pick Up Parts Data.',
        data: await this.pickUpPartService.getAllEngineerPickUpParts(),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getAllEngineerPickUpParts error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  async getEngineerPickUpPartsById(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'getEngineerPickUpPartsById start time : ' + new Date().toLocaleString()
      );
      return {
        description: 'Get Engineer Pick Up Parts Data By Id.',
        data: await this.pickUpPartService.getByIdEngineerPickUpParts(id),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getEngineerPickUpPartsById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  async createEngineerPickUpParts(
    @Body() pickUpPartsDto: PickUpPartsDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'createEngineerPickUpParts start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Create Engineer Pick Up Parts data.',
        data: await this.pickUpPartService.createEngineerPickUpParts(
          pickUpPartsDto,
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
            description: 'createEngineerPickUpParts error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id')
  async updateEngineerPickUpParts(
    @Param('id') id: string,
    @Body() pickUpPartsDto: PickUpPartsDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log(
      'updateEngineerPickUpParts start time : ' + new Date().toLocaleString()
    );

    try {
      return {
        description: 'Update Engineer Pick Up Parts data.',
        data: await this.pickUpPartService.updateEngineerPickUpParts(
          id,
          pickUpPartsDto,
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
              'updateEngineerPickUpParts error : ' + JSON.stringify(error),
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  async deleteEngineerPickUpParts(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'deleteEngineerPickUpParts start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Delete Engineer Pick Up Parts data.',
        data: await this.pickUpPartService.deleteEngineerPickUpParts(
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
              'deleteEngineerPickUpParts error : ' + JSON.stringify(error),
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
