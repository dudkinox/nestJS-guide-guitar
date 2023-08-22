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
import { ApiTags } from '@nestjs/swagger';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { UpdateNotificationDto } from './dto/updateNotification.dto';
import { NotificationService } from './notification.service';

@ApiTags('Notification')
@Controller('/notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) { }

  @Get()
  async getAllNotification(): Promise<ControllerResponse> {
    try {
      return {
        description: 'Get all notifications.',
        data: await this.notificationService.getAllNotifications(),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getAllNotification error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
  @Get('/:id')
  async getByIdNotification(
    @Param('id') id: string
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'Get by id notifications.',
        data: await this.notificationService.getByIdNotification(id),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: 'getByIdNotification error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  async createNotification(
    @Body() createNotificationDto: CreateNotificationDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'create notification.',
        data: await this.notificationService.createNotification(
          createNotificationDto,
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
            description: 'createNotification error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch('/:id')
  async updateNotification(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'update notification by id.',
        data: await this.notificationService.updateNotification(
          id,
          updateNotificationDto,
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
            description: 'updateNotification error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete('/:id')
  async deleteNotification(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        description: 'Delete notification.',
        data: await this.notificationService.deleteNotification(
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
            description: 'deleteNotification error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
