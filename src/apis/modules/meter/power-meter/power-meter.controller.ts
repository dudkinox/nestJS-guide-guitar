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
import { PowerMeterService } from './power-meter.service';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { CreatePowerMeterDto } from './dto/createPowerMeter.dto';
import { UpdatePowerMeterDto } from './dto/updatePowerMeter.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PowerMeter } from 'src/model/schemas/meter/power-meter';
import { QueryPowerMeter } from './dto/queryPowerMeter.dto';

@ApiTags('power-meter module')
@Controller('power-meter')
export class PowerMeterController {
  constructor(private readonly powerMeterService: PowerMeterService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all power-meter data.',
    type: [PowerMeter],
  })
  async getPowerMeters(
    @Query() query: QueryPowerMeter
  ): Promise<ControllerResponse> {
    try {
      Logger.log('getPowerMeters start time : ' + new Date().toLocaleString());

      return {
        data: await this.powerMeterService.getAllPowerMeters(query),
        description: 'Get all power-meter data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getPowerMeters error : ' + error,
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
    description: 'Get power-meter data by id.',
    type: PowerMeter,
  })
  @ApiParam({
    name: 'id',
    description: 'power meter id',
    type: String,
    required: true,
  })
  async getPowerMeterById(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    Logger.log('getPowerMeterById start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.powerMeterService.getPowerMeterById(id),
        description: 'Get power-meter data by id.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getPowerMeterById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: CreatePowerMeterDto,
    description: 'Request body for create power meter.',
  })
  async createPowerMeter(
    @Body() createPowerMeterDto: CreatePowerMeterDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('createPowerMeter start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.powerMeterService.createPowerMeter(
          createPowerMeterDto,
          req.user.payload?._id
        ),
        description: 'Create power meter data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'createPowerMeter error : ' + error,
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
    description: 'power meter id',
    type: String,
    required: true,
  })
  @ApiBody({
    type: UpdatePowerMeterDto,
    description: 'Request body for update power meter.',
  })
  async updatePowerMeter(
    @Param('id') id: string,
    @Body() updatePowerMeterDto: UpdatePowerMeterDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('updatePowerMeter start time : ' + new Date().toLocaleString());
    try {
      return {
        data: await this.powerMeterService.updatePowerMeter(
          id,
          updatePowerMeterDto,
          req.user.payload?._id
        ),
        description: 'Update power meter data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'updatePowerMeter error : ' + error,
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
    description: 'power meter id',
    type: String,
    required: true,
  })
  async deletePowerMeter(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('deletePowerMeter start time : ' + new Date().toLocaleString());
    try {
      return {
        data: await this.powerMeterService.deletePowerMeter(
          id,
          req.user.payload?._id
        ),
        description: 'Delete power meter data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'deletePowerMeter error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
