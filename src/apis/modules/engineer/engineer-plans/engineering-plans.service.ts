import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateEngineerPlanDto } from './dto/createEngineerPlans.dto';
import { UpdateEngineerPlanDto } from './dto/updateEngineerPlans.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PlansQuery } from './dto/engineerPlanQuery.dto';
import { EngineerPlan } from 'src/model/schemas/engineer/engineer-plans';
@Injectable()
export class EngineeringPlansService {
  constructor(
    @InjectModel('engineer_plans')
    private readonly engineerPlanModel: Model<EngineerPlan>
  ) {}

  async getAllPlans(query?: PlansQuery): Promise<EngineerPlan[]> {
    try {
      const {
        machinery_id = '',
        projects_id = '',
        created_by = '',
        engineer_frequency_id = '',
        engineer_work_type_id = '',
        worker_id,
      } = query;

      const queryPlan = {
        is_active: true,
        'projects_id._id': { $regex: projects_id },
        'machinery_id._id': { $regex: machinery_id, $options: 'i' },
        'created_by._id': { $regex: created_by, $options: 'i' },
        'engineer_frequency_id._id': {
          $regex: engineer_frequency_id,
          $options: 'i',
        },
        'engineer_work_type_id._id': {
          $regex: engineer_work_type_id,
          $options: 'i',
        },
      };

      if (worker_id) {
        queryPlan['worker_id._id'] = { $regex: worker_id };
      }
      return await this.engineerPlanModel
        .find(queryPlan)
        .populate([
          'projects_id.data',
          'engineer_system_id.data',
          'engineer_work_type_id.data',
          'engineer_service_area_id.data',
          'machinery_id.data',
          'engineer_frequency_id.data',
          'engineer_worksheet_template_id.data',
          'owner_work.data',
          'answer.data',
          'worker_id.data',
          'engineer_checker_team_id.data',
          'created_by.data',
          'updated_by.data',
        ]);
    } catch (error) {
      throw error;
    }
  }

  async getPlansById(id: string): Promise<EngineerPlan[]> {
    try {
      return await this.engineerPlanModel
        .findById(id)
        .populate([
          'projects_id.data',
          'engineer_system_id.data',
          'engineer_work_type_id.data',
          'engineer_service_area_id.data',
          'machinery_id.data',
          'engineer_frequency_id.data',
          'engineer_worksheet_template_id.data',
          'owner_work.data',
          'answer.data',
          'worker_id.data',
          'engineer_checker_team_id.data',
          'created_by.data',
          'updated_by.data',
        ]);
    } catch (error) {
      throw error;
    }
  }

  async createPlan(
    createEngineerPlanDto: CreateEngineerPlanDto,
    user_id: string
  ): Promise<EngineerPlan> {
    try {
      const {
        engineer_checker_team_id,
        engineer_frequency_id,
        engineer_service_area_id,
        engineer_system_id,
        engineer_work_type_id,
        engineer_worksheet_template_id,
        machinery_id,
        owner_work,
        projects_id,
        answer,
        worker_id,
        start_by,
        end_by,
      } = createEngineerPlanDto;
      return await this.engineerPlanModel.create({
        ...createEngineerPlanDto,
        projects_id: {
          data: projects_id,
          _id: projects_id,
        },
        machinery_id: {
          data: machinery_id,
          _id: machinery_id,
        },
        engineer_checker_team_id: {
          data: engineer_checker_team_id,
          _id: engineer_checker_team_id,
        },
        engineer_service_area_id: {
          data: engineer_service_area_id,
          _id: engineer_service_area_id,
        },
        engineer_system_id: {
          data: engineer_system_id,
          _id: engineer_system_id,
        },
        engineer_worksheet_template_id: {
          data: engineer_worksheet_template_id,
          _id: engineer_worksheet_template_id,
        },
        engineer_frequency_id: {
          data: engineer_frequency_id,
          _id: engineer_frequency_id,
        },
        engineer_work_type_id: {
          data: engineer_work_type_id,
          _id: engineer_work_type_id,
        },
        owner_work: {
          data: owner_work,
          _id: owner_work,
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
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async updatePlan(
    id: string,
    updateEngineerPlanDto: UpdateEngineerPlanDto,
    user_id: string
  ): Promise<EngineerPlan> {
    try {
      const {
        engineer_checker_team_id,
        engineer_frequency_id,
        engineer_service_area_id,
        engineer_system_id,
        engineer_work_type_id,
        engineer_worksheet_template_id,
        machinery_id,
        owner_work,
        projects_id,
        answer,
        worker_id,
        start_by,
        end_by,
      } = updateEngineerPlanDto;
      return await this.engineerPlanModel.findByIdAndUpdate(
        id,
        {
          ...updateEngineerPlanDto,
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
          engineer_frequency_id: engineer_frequency_id
            ? {
                data: engineer_frequency_id,
                _id: engineer_frequency_id,
              }
            : undefined,
          engineer_checker_team_id: engineer_checker_team_id
            ? {
                data: engineer_checker_team_id,
                _id: engineer_checker_team_id,
              }
            : undefined,
          engineer_service_area_id: engineer_service_area_id
            ? {
                data: engineer_service_area_id,
                _id: engineer_service_area_id,
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
          engineer_work_type_id: engineer_work_type_id
            ? {
                data: engineer_work_type_id,
                _id: engineer_work_type_id,
              }
            : undefined,
          owner_work: owner_work
            ? {
                data: owner_work,
                _id: owner_work,
              }
            : undefined,
          worker_id: worker_id
            ? {
                data: worker_id,
                _id: worker_id,
              }
            : undefined,
          start_by: start_by
            ? {
                data: start_by,
                _id: start_by,
              }
            : undefined,
          answer: answer
            ? answer.map((each) => {
                return { data: each, _id: each };
              })
            : undefined,
          end_by: end_by
            ? {
                data: end_by,
                _id: end_by,
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

  async deletePlan(id: string, user_id): Promise<EngineerPlan> {
    try {
      return await this.engineerPlanModel.findByIdAndUpdate(id, {
        is_active: false,
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      throw error;
    }
  }
}
