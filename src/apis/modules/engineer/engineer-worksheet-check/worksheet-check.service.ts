import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { WorksheetCheck } from "src/model/schemas/engineer/engineer-worksheet-check";
import { CreateWorksheetCheckDto } from "./dto/createWorksheetCheck.dto";
import { UpdateWorksheetCheckDto } from "./dto/updateWorksheetCheck.dto";

@Injectable()
export class EngineerWorksheetCheckService {
  constructor(
    @InjectModel("worksheet_checks")
    private readonly worksheetCheckModel: Model<WorksheetCheck>
  ) {}

  async getAllWorksheetCheck() {
    try {
      return await this.worksheetCheckModel
        .find({ is_active: true })
        .populate(["answer_id", "checker_id", "created_by", "updated_by"]);
    } catch (error) {
      Logger.error("[GET] /apis/worksheet-check : " + error);
      throw error;
    }
  }

  async getByIdWorksheetCheck(id: string) {
    try {
      return await this.worksheetCheckModel
        .findById(id)
        .populate(["answer_id", "checker_id", "created_by", "updated_by"]);
    } catch (error) {
      Logger.error(`[GET] /apis/worksheet-check/${id} : ` + error);
      throw error;
    }
  }

  async createWorksheetCheck(
    createWorksheetCheckDto: CreateWorksheetCheckDto,
    user_id: string
  ) {
    try {
      const { answer_id, checker_id } = createWorksheetCheckDto;
      return await this.worksheetCheckModel.create({
        ...createWorksheetCheckDto,
        answer_id: { data: answer_id, _id: answer_id },
        checker_id: { data: checker_id, _id: checker_id },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      Logger.error("[POST] /apis/worksheet-check : " + error);
      throw error;
    }
  }
  async updateWorksheetCheck(
    id: string,
    updateWorksheetCheckDto: UpdateWorksheetCheckDto,
    user_id: string
  ) {
    try {
      const { answer_id, checker_id } = updateWorksheetCheckDto;
      return await this.worksheetCheckModel.findByIdAndUpdate(
        id,
        {
          ...updateWorksheetCheckDto,
          answer_id: answer_id
            ? { data: answer_id, _id: answer_id }
            : undefined,
          checker_id: checker_id
            ? { data: checker_id, _id: checker_id }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      Logger.error("[PATCH] /apis/worksheet-check : " + error);
      throw error;
    }
  }

  async deleteWorksheetCheck(id: string, user_id: string) {
    try {
      return await this.worksheetCheckModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      Logger.error("[DELETE] /apis/worksheet-check : " + error);
      throw error;
    }
  }
}
