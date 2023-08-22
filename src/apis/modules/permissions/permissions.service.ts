import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PermissionsModel } from "src/model/schemas/permissions";
import { PermissionsDto } from "./dto/permissions.dto";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel("permissions")
    private readonly permissionsModel: Model<PermissionsModel>
  ) {}

  async getAllPermissions(): Promise<PermissionsModel[]> {
    try {
      const result = await this.permissionsModel.find();

      Logger.log(
        "getAllPermissions result for keep all permissions : " +
          JSON.stringify(result)
      );
      return result;
    } catch (error) {
      Logger.error("apis/permissions : " + error);
      throw error;
    }
  }

  async getPermissionsById(id: string): Promise<PermissionsModel> {
    try {
      const permissions = await this.permissionsModel.findOne({ id });
      Logger.log(
        "getPermissionsById result for keep permissions by id : " +
          JSON.stringify(permissions)
      );
      if (!permissions) {
        throw new Error("permissions not found.");
      }

      return permissions;
    } catch (error) {
      Logger.error("apis/permissions/:id : " + error);
      throw error;
    }
  }

  async createPermissions(
    createSystemsDto: PermissionsDto,
    user_id: string
  ): Promise<PermissionsModel> {
    const createdRoles = new this.permissionsModel({
      ...createSystemsDto,
      is_active: true,
      created_by: { data: user_id, _id: user_id },
      updated_by: { data: user_id, _id: user_id },
    });
    return createdRoles.save();
  }

  async updateUser(
    id: string,
    updatePermissionsDto: PermissionsDto,
    user_id: string
  ): Promise<PermissionsModel> {
    const user = await this.permissionsModel.findByIdAndUpdate(
      id,
      {
        ...updatePermissionsDto,
        updated_by: { data: user_id, _id: user_id },
      },
      {
        new: true,
      }
    );
    return user.save();
  }

  async deletePermissions(id: string, user_id: string): Promise<string> {
    await this.permissionsModel.findByIdAndUpdate(
      id,
      {
        is_active: false,
        updated_by: { data: user_id, _id: user_id },
      },
      { new: true }
    );
    return "Delete permissions success.";
  }
}
