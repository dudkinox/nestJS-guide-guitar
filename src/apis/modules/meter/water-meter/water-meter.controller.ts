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
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { WaterMeter } from 'src/model/schemas/meter/water-meter';
import { CreateWaterMeterDto } from './dto/createWaterMeter.dto';
import { QueryWaterMeter } from './dto/queryWaterMeter.dto';
import { UpdateWaterMeterDto } from './dto/updateWaterMeter.dto';
import { WaterMeterService } from './water-meter.service';

@ApiTags('water-meter module')
@Controller('water-meter')
export class WaterMeterController {
  constructor(private readonly waterMeterService: WaterMeterService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all Water-meter data.',
    type: [WaterMeter],
  })
  async getWaterMeters(
    @Query() query: QueryWaterMeter
  ): Promise<ControllerResponse> {
    try {
      Logger.log('getWaterMeters start time : ' + new Date().toLocaleString());

      return {
        data: await this.waterMeterService.getAllWaterMeters(query),
        description: 'Get all Water-meter data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getWaterMeters error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get Water-meter data by id.',
    type: WaterMeter,
  })
  @ApiParam({
    name: 'id',
    description: 'Water meter id',
    type: String,
    required: true,
  })
  async getWaterMeterById(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    Logger.log('getWaterMeterById start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.waterMeterService.getWaterMeterById(id),
        description: 'Get Water-meter data by id.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getWaterMeterById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: CreateWaterMeterDto,
    description: 'Request body for create Water meter.',
  })
  async createWaterMeter(
    @Body() createWaterMeterDto: CreateWaterMeterDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('createWaterMeter start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.waterMeterService.createWaterMeter(
          createWaterMeterDto,
          req.user.payload?._id
        ),
        description: 'Create Water meter data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'createWaterMeter error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'Water meter id',
    type: String,
    required: true,
  })
  @ApiBody({
    type: UpdateWaterMeterDto,
    description: 'Request body for update Water meter.',
  })
  async updateWaterMeter(
    @Param('id') id: string,
    @Body() updateWaterMeterDto: UpdateWaterMeterDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('updateWaterMeter start time : ' + new Date().toLocaleString());
    try {
      return {
        data: await this.waterMeterService.updateWaterMeter(
          id,
          updateWaterMeterDto,
          req.user.payload?._id
        ),
        description: 'Update Water meter data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'updateWaterMeter error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'Water meter id',
    type: String,
    required: true,
  })
  async deleteWaterMeter(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('deleteWaterMeter start time : ' + new Date().toLocaleString());
    try {
      return {
        data: await this.waterMeterService.deleteWaterMeter(
          id,
          req.user.payload?._id
        ),
        description: 'Delete Water meter data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'deleteWaterMeter error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
