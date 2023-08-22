import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationModel } from 'src/model/schemas/notification';
import { CreateNotificationDto } from './dto/createNotification.dto';
import { UpdateNotificationDto } from './dto/updateNotification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('notifications')
    private readonly notificationModel: Model<NotificationModel>
  ) {}

  async getAllNotifications() {
    try {
      return await this.notificationModel
        .find({ is_active: true })
        .populate(['projects_id.data', 'created_by.data', 'updated_by.data']);
    } catch (error) {
      Logger.error('[GET] /apis/notifications : ' + error);
      throw error;
    }
  }

  async getByIdNotification(id: string) {
    try {
      return await this.notificationModel
        .findById(id)
        .populate([
          'projects_id.data',
          'created_by.data',
          'updated_by.data.data',
        ]);
    } catch (error) {
      Logger.error(`[GET] /apis/notifications/${id} : ` + error);
      throw error;
    }
  }

  async createNotification(
    createNotificationDto: CreateNotificationDto,
    user_id: string
  ) {
    try {
      const { projects_id } = createNotificationDto;
      return await this.notificationModel.create({
        ...createNotificationDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      Logger.error(`[POST] /apis/notifications : ` + error);
      throw error;
    }
  }

  async updateNotification(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
    user_id: string
  ) {
    try {
      const { projects_id } = updateNotificationDto;
      return await this.notificationModel.findByIdAndUpdate(
        id,
        {
          ...updateNotificationDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
              }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      Logger.error(`[PATCH] /apis/notifications/${id} : ` + error);
      throw error;
    }
  }

  async deleteNotification(id: string, user_id: string) {
    try {
      return await this.notificationModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        { new: true }
      );
    } catch (error) {
      Logger.error(`[DELETE] /apis/notifications/${id} : ` + error);
      throw error;
    }
  }
}
