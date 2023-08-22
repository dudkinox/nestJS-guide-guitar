import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Projects } from 'src/model/schemas/projects';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel('projects') private readonly projectModel: Model<Projects>
  ) {}

  async findAllProjects(): Promise<Projects[]> {
    try {
      return await this.projectModel
        .find({ is_active: true })
        .populate([
          'subdistrict_id.data',
          'district_id.data',
          'province_id.data',
          'contact_subdistrict_id.data',
          'contact_district_id.data',
          'contact_province_id.data',
          'building_manager.data',
          'niti_manager.data',
          'accounting_manager.data',
          'finance_manager.data',
          'created_by.data',
          'updated_by.data',
        ]);
    } catch (err) {
      throw err;
    }
  }

  async findOneProject(id: string): Promise<Projects> {
    try {
      return await this.projectModel
        .findById(id)
        .populate([
          'subdistrict_id.data',
          'district_id.data',
          'province_id.data',
          'contact_subdistrict_id.data',
          'contact_district_id.data',
          'contact_province_id.data',
          'building_manager.data',
          'niti_manager.data',
          'accounting_manager.data',
          'finance_manager.data',
          'created_by.data',
          'updated_by.data',
        ]);
    } catch (err) {
      throw err;
    }
  }
  async createProject(
    createProjectDto: CreateProjectDto,
    user_id: string
  ): Promise<Projects> {
    try {
      return await this.projectModel.create({
        ...createProjectDto,
        subdistrict_id: {
          data: createProjectDto.subdistrict_id,
          _id: createProjectDto.subdistrict_id,
        },
        district_id: {
          data: createProjectDto.district_id,
          _id: createProjectDto.district_id,
        },
        province_id: {
          data: createProjectDto.province_id,
          _id: createProjectDto.province_id,
        },
        contact_subdistrict_id: createProjectDto.contact_subdistrict_id
          ? {
              data: createProjectDto.contact_subdistrict_id,
              _id: createProjectDto.contact_subdistrict_id,
            }
          : undefined,
        contact_district_id: createProjectDto.contact_district_id
          ? {
              data: createProjectDto.contact_district_id,
              _id: createProjectDto.contact_district_id,
            }
          : undefined,
        contact_province_id: createProjectDto.province_id
          ? {
              data: createProjectDto.province_id,
              _id: createProjectDto.province_id,
            }
          : undefined,
        building_manager: createProjectDto.building_manager
          ? {
              data: createProjectDto.building_manager,
              _id: createProjectDto.building_manager,
            }
          : undefined,
        niti_manager: createProjectDto.niti_manager
          ? {
              data: createProjectDto.niti_manager,
              _id: createProjectDto.niti_manager,
            }
          : undefined,
        accounting_manager: createProjectDto.accounting_manager
          ? {
              data: createProjectDto.accounting_manager,
              _id: createProjectDto.accounting_manager,
            }
          : undefined,
        finance_manager: createProjectDto.finance_manager
          ? {
              data: createProjectDto.finance_manager,
              _id: createProjectDto.finance_manager,
            }
          : undefined,
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (err) {
      throw err;
    }
  }
  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDto,
    user_id: string
  ): Promise<Projects> {
    try {
      const project = await this.projectModel.findByIdAndUpdate(
        id,
        {
          ...updateProjectDto,
          subdistrict_id: updateProjectDto.subdistrict_id
            ? {
                data: updateProjectDto.subdistrict_id,
                _id: updateProjectDto.subdistrict_id,
              }
            : undefined,
          district_id: updateProjectDto.district_id
            ? {
                data: updateProjectDto.district_id,
                _id: updateProjectDto.district_id,
              }
            : undefined,
          province_id: updateProjectDto.province_id
            ? {
                data: updateProjectDto.province_id,
                _id: updateProjectDto.province_id,
              }
            : undefined,
          contact_subdistrict_id: updateProjectDto.contact_subdistrict_id
            ? {
                data: updateProjectDto.contact_subdistrict_id,
                _id: updateProjectDto.contact_subdistrict_id,
              }
            : undefined,
          contact_district_id: updateProjectDto.contact_district_id
            ? {
                data: updateProjectDto.contact_district_id,
                _id: updateProjectDto.contact_district_id,
              }
            : undefined,
          contact_province_id: updateProjectDto.province_id
            ? {
                data: updateProjectDto.province_id,
                _id: updateProjectDto.province_id,
              }
            : undefined,
          building_manager: updateProjectDto.building_manager
            ? {
                data: updateProjectDto.building_manager,
                _id: updateProjectDto.building_manager,
              }
            : undefined,
          niti_manager: updateProjectDto.niti_manager
            ? {
                data: updateProjectDto.niti_manager,
                _id: updateProjectDto.niti_manager,
              }
            : undefined,
          accounting_manager: updateProjectDto.accounting_manager
            ? {
                data: updateProjectDto.accounting_manager,
                _id: updateProjectDto.accounting_manager,
              }
            : undefined,
          finance_manager: updateProjectDto.finance_manager
            ? {
                data: updateProjectDto.finance_manager,
                _id: updateProjectDto.finance_manager,
              }
            : undefined,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
      return project;
    } catch (err) {
      throw err;
    }
  }
  async deleteProject(id: string, user_id: string): Promise<Projects> {
    try {
      const project = await this.projectModel.findByIdAndUpdate(
        id,
        {
          is_active: false,
          updated_by: { data: user_id, _id: user_id },
        },
        { new: true }
      );
      return project;
    } catch (err) {
      throw err;
    }
  }
}
