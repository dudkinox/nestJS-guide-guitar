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
import { MachineryService } from './machinery.service';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { CreateMachineryDto } from './dto/createMachinery.dto';
import { UpdateMachineryDto } from './dto/updateMachinery.dto';
import { MachineryHistoryDto } from './dto/machineryHistory/MachineryHistory.dto';

@ApiTags('machinery')
@Controller('machinery')
export class MachineryController {
  constructor(private readonly machineryService: MachineryService) {}

  @Get()
  async getAllMachineries(): Promise<ControllerResponse> {
    try {
      return {
        data: await this.machineryService.getAllMachineries(),
        description: 'Get All Machineries Data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'getAllMachineries error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  async createMachinery(
    @Body() createMachineryDto: CreateMachineryDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.machineryService.createMachinery(
          createMachineryDto,
          req.user.payload?._id
        ),
        description: 'Create machinery data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'createMachinery error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id')
  async updateMachineryDto(
    @Param('id') id: string,
    @Body() updateMachineryDto: UpdateMachineryDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.machineryService.updateMachinery(
          id,
          updateMachineryDto,
          req.user.payload?._id
        ),
        description: 'Update machinery data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'updateMachineryDto error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  async deleteMachinery(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.machineryService.deleteMachinery(
          id,
          req.user.payload._id
        ),
        description: 'Delete machinery data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'deleteMachinery error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('/history')
  async getAllMachineryHistory(): Promise<ControllerResponse> {
    try {
      Logger.log(
        'getAllMachineryHistory start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Get All Machinery History Data.',
        data: await this.machineryService.getAllMachineryHistory(),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'getAllMachineryHistory error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('/history/:id')
  async getMachineryHistoryById(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'getMachineryHistoryById start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Get Machinery History Data By Id.',
        data: await this.machineryService.getMachineryHistoryById(id),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'getMachineryHistoryById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('/history')
  async createMachineryHistory(
    @Body() createMachineryDto: MachineryHistoryDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'createMachineryHistory start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Create Machinery History Data.',
        data: await this.machineryService.createMachineryHistory(
          createMachineryDto,
          req.user.payload._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'createMachineryHistory error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch('/history/:id')
  async updateMachineryHistory(
    @Param('id') id: string,
    @Body() updateMachineryDto: MachineryHistoryDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'updateMachineryHistory start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Update Machinery History Data.',
        data: await this.machineryService.updateMachineryHistory(
          id,
          updateMachineryDto,
          req.user.payload._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'updateMachineryHistory error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete('/history/:id')
  async deleteMachineryHistory(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      Logger.log(
        'deleteMachineryHistory start time : ' + new Date().toLocaleString()
      );

      return {
        description: 'Delete Machinery History Data.',
        data: await this.machineryService.deleteMachineryHistory(
          id,
          req.user.payload._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.MACHINERY_SERVICE,
            description: 'deleteMachineryHistory error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
