import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Roles } from "src/model/schemas/roles";
import { RolesDto } from "./dto/roles.dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel("roles")
    private readonly rolesModel: Model<Roles>
  ) {}

  async getAllRoles(): Promise<Roles[]> {
    try {
      const result = await this.rolesModel.find().populate("projects_id");

      Logger.log(
        "getAllRoles result for keep all roles : " + JSON.stringify(result)
      );
      return result;
    } catch (error) {
      Logger.error("apis/roles : " + error);
      throw error;
    }
  }

  async getRolesById(id: string): Promise<Roles> {
    try {
      const user = await this.rolesModel.findOne({ id });
      Logger.log(
        "getRolesId result for keep all roles : " + JSON.stringify(user)
      );
      if (!user) {
        throw new Error("User not found.");
      }

      return user;
    } catch (error) {
      Logger.error("apis/roles/:id : " + error);
      throw error;
    }
  }

  async createRoles(createRolesDto: RolesDto, user_id: string): Promise<Roles> {
    const { projects_id } = createRolesDto;
    const createdRoles = new this.rolesModel({
      ...createRolesDto,
      projects_id: { data: projects_id, _id: projects_id },
      is_active: true,
      created_by: { data: user_id, _id: user_id },
      updated_by: { data: user_id, _id: user_id },
    });
    return createdRoles.save();
  }

  async updateUser(
    id: string,
    updateUserDto: RolesDto,
    user_id: string
  ): Promise<Roles> {
    const { projects_id } = updateUserDto;
    const user = await this.rolesModel.findByIdAndUpdate(
      id,
      {
        ...updateUserDto,
        projects_id: projects_id
          ? { data: projects_id, _id: projects_id }
          : undefined,
        updated_by: { data: user_id, _id: user_id },
      },
      {
        new: true,
      }
    );
    return user.save();
  }

  async deleteUser(id: string, user_id: string): Promise<string> {
    await this.rolesModel.findByIdAndUpdate(
      id,
      {
        is_active: false,
        updated_by: { data: user_id, _id: user_id },
      },
      { new: true }
    );
    return "Delete user success.";
  }
}
