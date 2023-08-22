import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EngineerRepair } from 'src/model/schemas/engineer';
import { RepairQuery, WorkStatus } from './dto/queryRepair.dto';
import { RepairDto } from './dto/Repair.dto';
import { UpdateRepairDto } from './dto/updateRepair.dto';

@Injectable()
export class EngineerRepairService {
  constructor(
    @InjectModel('repairs')
    private readonly repairModel: Model<EngineerRepair>
  ) {}

  private queryStatus(status: string | '') {
    if (status === '') {
      return [
        'Waiting',
        'Processing',
        'NotDone',
        'Checking',
        'Successed',
        'NotSucceed',
      ];
    } else if (status === WorkStatus.NewTask) {
      return ['NotDone'];
    } else if (status === WorkStatus.OnProcess) {
      return ['Processing', 'Waiting', 'Checking'];
    } else if (status === WorkStatus.Complete) {
      return ['Successed'];
    } else {
      return [status];
    }
  }

  async getAllEngineerRepairs(query: RepairQuery) {
    try {
      const {
        created_by = '',
        status = '',
        worker_id,
        projects_id = '',
      } = query;

      const queryRepair = {
        is_active: true,
        status: { $in: this.queryStatus(status) },
        'projects_id._id': { $regex: projects_id },
        'created_by._id': { $regex: created_by },
      };

      if (worker_id) {
        queryRepair['worker_id._id'] = { $regex: worker_id };
      }

      const repairs = await this.repairModel
        .find(queryRepair)
        .populate([
          'projects_id.data',
          'machinery_id.data',
          'engineer_service_area_id.data',
          'engineer_place_id.data',
          'engineer_system_id.data',
          'engineer_worksheet_template_id.data',
          'engineer_checker_team_id.data',
          'answer.data',
          'created_by.data',
          'worker_id.data',
        ]);
      return repairs;
    } catch (error) {
      Logger.error('[GET] /apis/engineering-base/engineer-repairs : ' + error);
      throw error;
    }
  }
  async getByIdEngineerRepairs(id: string) {
    try {
      return await this.repairModel
        .findById(id)
        .populate([
          'projects_id.data',
          'machinery_id.data',
          'engineer_service_area_id.data',
          'engineer_place_id.data',
          'engineer_system_id.data',
          'engineer_worksheet_template_id.data',
          'engineer_checker_team_id.data',
          'created_by.data',
          'answer.data',
          'worker_id.data',
        ]);
    } catch (error) {
      Logger.error(
        '[GET] /apis/engineering-base/engineer-repairs/:id : ' + error
      );
    }
  }
  async createEngineerRepairs(createRepairDto: RepairDto, user_id: string) {
    try {
      const {
        worker_id,
        engineer_checker_team_id,
        engineer_place_id,
        engineer_service_area_id,
        engineer_system_id,
        engineer_worksheet_template_id,
        machinery_id,
        projects_id,
        answer,
        start_by,
        end_by,
      } = createRepairDto;

      return await this.repairModel.create({
        ...createRepairDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        machinery_id: {
          data: machinery_id,
          _id: machinery_id,
        },
        engineer_service_area_id: {
          data: engineer_service_area_id,
          _id: engineer_service_area_id,
        },
        engineer_place_id: {
          data: engineer_place_id,
          _id: engineer_place_id,
        },
        engineer_system_id: {
          data: engineer_system_id,
          _id: engineer_system_id,
        },
        engineer_worksheet_template_id: {
          data: engineer_worksheet_template_id,
          _id: engineer_worksheet_template_id,
        },
        engineer_checker_team_id: {
          data: engineer_checker_team_id,
          _id: engineer_checker_team_id,
        },
        worker_id: {
          data: worker_id,
          _id: worker_id,
        },
        answer: answer
          ? answer.map((each) => {
              return { data: each, _id: each };
            })
          : undefined,
        start_by: {
          data: start_by,
          _id: start_by,
        },
        end_by: {
          data: end_by,
          _id: end_by,
        },
        created_by: {
          data: user_id,
          _id: user_id,
        },
        updated_by: {
          data: user_id,
          _id: user_id,
        },
      });
    } catch (error) {
      Logger.error('[POST] /apis/engineering-base/engineer-repairs : ' + error);
      throw error;
    }
  }
  async updateEngineerRepairs(
    id: string,
    updateRepairDto: UpdateRepairDto,
    user_id: string
  ) {
    try {
      const {
        worker_id,
        engineer_checker_team_id,
        engineer_place_id,
        engineer_service_area_id,
        engineer_system_id,
        engineer_worksheet_template_id,
        machinery_id,
        projects_id,
        answer,
        start_by,
        end_by,
      } = updateRepairDto;

      return await this.repairModel.findByIdAndUpdate(
        id,
        {
          ...updateRepairDto,
          projects_id: projects_id
            ? {
                data: projects_id,
                _id: projects_id,
              }
            : undefined,
          machinery_id: machinery_id
            ? {
                data: machinery_id,
                _id: machinery_id,
              }
            : undefined,
          engineer_service_area_id: engineer_service_area_id
            ? {
                data: engineer_service_area_id,
                _id: engineer_service_area_id,
              }
            : undefined,
          engineer_place_id: engineer_place_id
            ? {
                data: engineer_place_id,
                _id: engineer_place_id,
              }
            : undefined,
          engineer_system_id: engineer_system_id
            ? {
                data: engineer_system_id,
                _id: engineer_system_id,
              }
            : undefined,
          engineer_worksheet_template_id: engineer_worksheet_template_id
            ? {
                data: engineer_worksheet_template_id,
                _id: engineer_worksheet_template_id,
              }
            : undefined,
          engineer_checker_team_id: engineer_checker_team_id
            ? {
                data: engineer_checker_team_id,
                _id: engineer_checker_team_id,
              }
            : undefined,
          worker_id: worker_id
            ? {
                data: worker_id,
                _id: worker_id,
              }
            : undefined,
          answer: answer
            ? answer.map((each) => {
                return { data: each, _id: each };
              })
            : undefined,
          start_by: start_by
            ? {
                data: start_by,
                _id: start_by,
              }
            : undefined,
          end_by: end_by
            ? {
                data: end_by,
                _id: end_by,
              }
            : undefined,
          updated_by: {
            data: user_id,
            _id: user_id,
          },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      Logger.error(
        '[PATCH] /apis/engineering-base/engineer-repairs/:id : ' + error
      );
      throw error;
    }
  }
  async deleteEngineerRepairs(id: string, user_id: string) {
    try {
      return await this.repairModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: {
            data: user_id,
            _id: user_id,
          },
        },
        { new: true }
      );
    } catch (error) {
      Logger.error(
        '[DELETE] /apis/engineering-base/engineer-repairs/:id : ' + error
      );
      throw error;
    }
  }
}
