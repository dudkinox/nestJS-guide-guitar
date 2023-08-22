import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { CreateWorksheetTemplateDto } from './dto/createWorksheetTemplate.dto';
import { UpdateWorksheetTemplateDto } from './dto/updateWorksheetTemplate.dto';
import { EngineerWorkSheetTemplateService } from './worksheet-template.service';

@ApiTags('engineer worksheet template')
@Controller('worksheet-template')
export class EngineerWorksheetTemplateController {
  constructor(
    private worksheetTemplateService: EngineerWorkSheetTemplateService
  ) {}

  @Get()
  async getAllWorksheetTemplate(): Promise<ControllerResponse> {
    try {
      return {
        description: 'Get all engineer worksheet template.',
        data: await this.worksheetTemplateService.getAllWorksheetTemplate(),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getAllWorksheetTemplate error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  @Get('/:id')
  async getByIdWorksheetTemplate(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'Get engineer worksheet template by id.',
        data: await this.worksheetTemplateService.getByIdWorksheetTemplate(id),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getByIdWorksheetTemplate error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({ type: CreateWorksheetTemplateDto })
  async createWorksheetTemplate(
    @Body() createWorksheetTemplateDto: CreateWorksheetTemplateDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'Create engineer worksheet template.',
        data: await this.worksheetTemplateService.createWorksheetTemplate(
          createWorksheetTemplateDto,
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
            description: 'createWorksheetTemplate error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  @Patch('/:id')
  async updateWorksheetTemplate(
    @Param('id') id: string,
    @Body() updateWorksheetTemplateDto: UpdateWorksheetTemplateDto,
    @Req() req
  ) {
    try {
      return {
        description: 'update engineer worksheet template.',
        data: await this.worksheetTemplateService.updateWorksheetTemplate(
          id,
          updateWorksheetTemplateDto,
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
            description: 'updateWorksheetTemplate error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete('/:id')
  async deleteWorksheetTemplate(@Param('id') id: string, @Req() req) {
    try {
      return {
        description: 'delete engineer worksheet template',
        data: await this.worksheetTemplateService.deleteWorksheetTemplate(
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
            description: 'deleteWorksheetTemplate error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
