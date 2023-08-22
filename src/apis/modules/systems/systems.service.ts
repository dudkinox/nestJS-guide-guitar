import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Systems } from "src/model/schemas/systems";
import { SystemsDto } from "./dto/systems.dto";

@Injectable()
export class SystemsService {
  constructor(
    @InjectModel("system")
    private readonly systemsModel: Model<Systems>
  ) {}

  async getAllSystems(): Promise<Systems[]> {
    try {
      const result = await this.systemsModel.find();

      Logger.log(
        "getAllSystems result for keep all systems : " + JSON.stringify(result)
      );
      return result;
    } catch (error) {
      Logger.error("apis/systems : " + error);
      throw error;
    }
  }

  async getSystemsById(id: string): Promise<Systems> {
    try {
      const user = await this.systemsModel.findOne({ id });
      Logger.log(
        "getSystemsById result for keep systems by id : " + JSON.stringify(user)
      );
      if (!user) {
        throw new Error("User not found.");
      }

      return user;
    } catch (error) {
      Logger.error("apis/systems/:id : " + error);
      throw error;
    }
  }

  async createSystems(
    createSystemsDto: SystemsDto,
    user_id: string
  ): Promise<Systems> {
    const createdRoles = new this.systemsModel({
      ...createSystemsDto,
      is_active: true,
      created_by: { data: user_id, _id: user_id },
      updated_by: { data: user_id, _id: user_id },
    });
    return createdRoles.save();
  }

  async updateUser(
    id: string,
    updateSystemsDto: SystemsDto,
    user_id: string
  ): Promise<Systems> {
    const user = await this.systemsModel.findByIdAndUpdate(
      id,
      {
        ...updateSystemsDto,
        updated_by: { data: user_id, _id: user_id },
      },
      {
        new: true,
      }
    );
    return user.save();
  }

  async deleteUser(id: string, user_id: string): Promise<string> {
    await this.systemsModel.findByIdAndUpdate(
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
