import {
  Controller,
  Get,
  Query,
  Logger,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Body,
  Req,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { House } from 'src/model/schemas/house';
import { CreateHouseDto } from './dto/createHouse.dto';
import { QueryHouse } from './dto/queryHouse.dto';
import { UpdateHouseDto } from './dto/updateHouse.dto';
import { HouseService } from './house.service';

@ApiTags('house-module')
@Controller('house')
export class HouseController {
  constructor(private houseService: HouseService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get All List of Houses',
    type: House,
  })
  async getAllHouses(@Query() query: QueryHouse): Promise<ControllerResponse> {
    Logger.log('getAllHouses start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.houseService.getAllHouse(query),
        description: 'Get All List of Houses',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getAllHouses error : ' + error,
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
    description: 'Get Houses By Id',
    type: House,
  })
  @ApiParam({
    name: 'id',
    description: 'house_id',
    type: String,
    required: true,
  })
  async getHouseById(@Param('id') id: string): Promise<ControllerResponse> {
    Logger.log('getHouseById start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.houseService.getHouseById(id),
        description: 'Get Houses By Id',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getHouseById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: CreateHouseDto,
    description: 'Request body for create house.',
  })
  async postCreateHouse(
    @Body() createHouseDto: CreateHouseDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('postCreateHouse start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.houseService.createHouse(
          createHouseDto,
          req.user.payload?._id
        ),
        description: 'Create House',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'postCreateHouse error : ' + error,
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
    description: 'house id',
    type: String,
    required: true,
  })
  @ApiBody({
    type: UpdateHouseDto,
    description: 'Request Body for update house',
  })
  async patchUpdateHouse(
    @Param('id') id: string,
    @Body() updateHouseDto: UpdateHouseDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('patchUpdateHouse start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.houseService.updateHouse(
          id,
          updateHouseDto,
          req.user.payload?._id
        ),
        description: 'Update house detail.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'patchUpdateHouse error : ' + error,
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
    description: 'house id',
    type: String,
    required: true,
  })
  async deleteHouse(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('deleteHouse start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.houseService.deleteHouse(id, req.user.payload?._id),
        description: 'Delete house',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'deleteHouse error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
