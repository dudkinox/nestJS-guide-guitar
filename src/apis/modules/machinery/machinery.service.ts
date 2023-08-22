import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Machinery } from 'src/model/schemas/machinery/machinery';
import { CreateMachineryDto } from './dto/createMachinery.dto';
import { UpdateMachineryDto } from './dto/updateMachinery.dto';
import { MachineryHistory } from 'src/model/schemas/machinery/machinery-history';
import { MachineryHistoryDto } from './dto/machineryHistory/MachineryHistory.dto';

@Injectable()
export class MachineryService {
  constructor(
    @InjectModel('machineries')
    private readonly machineryModel: Model<Machinery>,
    @InjectModel('machinery_history')
    private readonly machineryHistoryModel: Model<MachineryHistory>
  ) {}

  async getAllMachineries(): Promise<Machinery[]> {
    try {
      return await this.machineryModel
        .find({ is_active: true })
        .populate([
          'projects_id.data',
          'engineer_system_id.data',
          'engineer_place_id.data',
          'engineer_service_area_id.data',
          'created_by.data',
          'updated_by.data',
        ]);
    } catch (error) {
      throw error;
    }
  }

  async createMachinery(
    createMachineryDto: CreateMachineryDto,
    user_id: string
  ): Promise<Machinery> {
    try {
      const {
        projects_id,
        engineer_place_id,
        engineer_system_id,
        engineer_service_area_id,
      } = createMachineryDto;
      return await this.machineryModel.create({
        ...createMachineryDto,
        projects_id: { data: projects_id, _id: projects_id },
        engineer_place_id: { data: engineer_place_id, _id: engineer_place_id },
        engineer_service_area_id: {
          data: engineer_service_area_id,
          _id: engineer_service_area_id,
        },
        engineer_system_id: {
          data: engineer_system_id,
          _id: engineer_system_id,
        },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateMachinery(
    id: string,
    updateMachineryDto: UpdateMachineryDto,
    user_id: string
  ): Promise<Machinery> {
    try {
      const {
        projects_id,
        engineer_place_id,
        engineer_system_id,
        engineer_service_area_id,
      } = updateMachineryDto;

      return await this.machineryModel.findByIdAndUpdate(
        id,
        {
          ...updateMachineryDto,
          projects_id: projects_id
            ? { data: projects_id, _id: projects_id }
            : undefined,
          engineer_place_id: engineer_place_id
            ? {
                data: engineer_place_id,
                _id: engineer_place_id,
              }
            : undefined,
          engineer_service_area_id: engineer_service_area_id
            ? {
                data: engineer_service_area_id,
                _id: engineer_service_area_id,
              }
            : undefined,
          engineer_system_id: engineer_place_id
            ? {
                data: engineer_system_id,
                _id: engineer_system_id,
              }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteMachinery(id: string, user_id: string): Promise<Machinery> {
    try {
      return await this.machineryModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getAllMachineryHistory() {
    try {
      return await this.machineryHistoryModel
        .find({ is_active: true })
        .populate([
          'project_id.data',
          'worker_id.data',
          'created_by.data',
          'updated_by.data',
        ]);
    } catch (error) {
      Logger.error('[GET] /apis/machinery/history : ' + error);
      throw error;
    }
  }

  async getMachineryHistoryById(id: string) {
    try {
      return await this.machineryHistoryModel.findById(id);
    } catch (error) {
      Logger.error('[GET] /apis/machinery/history/:id : ' + error);
    }
  }

  async createMachineryHistory(
    createMachineryHistoryDto: MachineryHistoryDto,
    user_id: string
  ) {
    try {
      const { project_id, machinery_id, date } = createMachineryHistoryDto;
      return await this.machineryHistoryModel.create({
        ...createMachineryHistoryDto,
        project_id: { data: project_id, _id: project_id },
        machinery_id: { data: machinery_id, _id: machinery_id },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      Logger.error('[POST] /apis/machinery/history : ' + error);
      throw error;
    }
  }

  async updateMachineryHistory(
    id: string,
    updateMachineryHistoryDto: MachineryHistoryDto,
    user_id: string
  ) {
    try {
      const { project_id, machinery_id, date } = updateMachineryHistoryDto;
      return await this.machineryHistoryModel.findByIdAndUpdate(
        id,
        {
          ...updateMachineryHistoryDto,
          project_id: project_id
            ? { data: project_id, _id: project_id }
            : undefined,
          machinery_id: machinery_id
            ? { data: machinery_id, _id: machinery_id }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      Logger.error('[PUT] /apis/machinery/history : ' + error);
      throw error;
    }
  }

  async deleteMachineryHistory(id: string, user_id: string) {
    try {
      return await this.machineryHistoryModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
    } catch (error) {
      Logger.error('[DELETE] /apis/machinery/history : ' + error);
      throw error;
    }
  }
}
