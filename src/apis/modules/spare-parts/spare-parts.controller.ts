import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { SparePartsService } from './spare-parts.service';
import { CreateSparePartDto } from './dto/createSparePart.dto';
import { UpdateSparePartDto } from './dto/updateSparePart.dto';
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
import { QuerySparePart } from './dto/querySparePart.dto';
import { SparePart } from 'src/model/schemas/spare-parts/spare-parts';

@ApiTags('spare-parts')
@Controller()
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get All List of Spare Parts',
    type: [SparePart],
  })
  async getAllSpareParts(
    @Query() query: QuerySparePart
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.sparePartsService.getAllSpareParts(query),
        description: 'Get All List of Spare Parts',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getAllSpareParts error : ' + error,
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
    description: 'Get Spare Part.',
    type: SparePart,
  })
  @ApiParam({
    name: 'id',
    description: 'spare_part_id',
    type: String,
    required: true,
  })
  async getSparePartById(@Param('id') id: string) {
    try {
      return {
        data: await this.sparePartsService.getSparePartById(id),
        description: 'Get Spare Part.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getSparePartById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: CreateSparePartDto,
    description: 'Request body for create spare part.',
  })
  async createSparePart(
    @Body() createSparePartDto: CreateSparePartDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.sparePartsService.createSparePart(
          createSparePartDto,
          req.user.payload?._id
        ),
        description: 'Create Spare Part Data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'createSparePart error : ' + error,
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
    description: 'spare_part_id',
    type: String,
    required: true,
  })
  @ApiBody({
    type: UpdateSparePartDto,
    description: 'Request body for update spare part.',
  })
  async updateSparePart(
    @Param('id') id: string,
    @Body() updateSparePart: UpdateSparePartDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'Update spare part detail.',
        data: await this.sparePartsService.updateSparePart(
          id,
          updateSparePart,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'updateSparePart error : ' + error,
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
    description: 'spare_part_id',
    type: String,
    required: true,
  })
  async deleteSparePart(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.sparePartsService.deleteSparePart(
          id,
          req.user.payload?._id
        ),
        description: 'Delete spare part data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'deleteSparePart error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
