import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prefix } from 'src/model/enum/user.enum';
import { UsersEmployees } from 'src/model/schemas/user-employee';
import { RsaUtil } from 'src/utils/rsa';
import { UpdateUserEmployeeDto } from './dto/updateUserEmployee.dto';
import { CreateUserEmployeeDto } from './dto/createUserEmployee.dto';
import { UserQuery } from './dto/queryUser.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly rsaUtil: RsaUtil,
    @InjectModel('user_employees')
    private readonly userEmployeeModel: Model<UsersEmployees>
  ) {}

  async getAllUsers(query?: UserQuery): Promise<UsersEmployees[]> {
    try {
      const { projects_id = '' } = query;
      const result = await this.userEmployeeModel
        .find({ 'projects_id._id': { $regex: projects_id } }, { password: 0 })
        .populate(['projects_id.data', 'created_by.data', 'updated_by.data']);

      Logger.log(
        'getAllUsers result for keep all user : ' + JSON.stringify(result)
      );
      return result;
    } catch (error) {
      Logger.error('apis/accounts-service/ : ' + error);
      throw error;
    }
  }

  async getUserByIdCard(id_card: string): Promise<UsersEmployees> {
    try {
      const user = await this.userEmployeeModel.findOne(
        { id_card },
        { password: 1 }
      );
      Logger.log(
        'getUserByIdCard result for keep all user : ' + JSON.stringify(user)
      );
      if (!user) {
        throw new Error('User not found.');
      }

      return user;
    } catch (error) {
      Logger.error('apis/accounts/user-employees/id-card/admin : ' + error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<UsersEmployees> {
    const user = await this.userEmployeeModel.findById(id, { password: 0 });
    return user;
  }

  async createUser(
    createUserDto: CreateUserEmployeeDto,
    user_id: string
  ): Promise<UsersEmployees> {
    const { prefix, other_prefix, password, projects_id } = createUserDto;

    const createdUser = new this.userEmployeeModel({
      ...createUserDto,
      projects_id: projects_id.map((each) => {
        return {
          data: each,
          _id: each,
        };
      }),
      role_id: {
        data: createUserDto.role_id,
        _id: createUserDto.role_id,
      },
      department_id: createUserDto.department_id
        ? {
            data: createUserDto.department_id,
            _id: createUserDto.department_id,
          }
        : undefined,
      section_id: createUserDto.section_id
        ? {
            data: createUserDto.section_id,
            _id: createUserDto.section_id,
          }
        : undefined,
      position_id: createUserDto.position_id
        ? {
            data: createUserDto.position_id,
            _id: createUserDto.position_id,
          }
        : undefined,
      holiday_group_id: createUserDto.holiday_group_id
        ? {
            data: createUserDto.holiday_group_id,
            _id: createUserDto.holiday_group_id,
          }
        : undefined,
      work_time_id: createUserDto.work_time_id
        ? {
            data: createUserDto.work_time_id,
            _id: createUserDto.work_time_id,
          }
        : undefined,
      workplace_id: createUserDto.workplace_id
        ? {
            data: createUserDto.workplace_id,
            _id: createUserDto.workplace_id,
          }
        : undefined,
      is_active: true,
      other_prefix: prefix === Prefix['OTHER'] ? other_prefix : '',
      password: this.rsaUtil.encrypt(password),
      created_by: { data: user_id, _id: user_id },
      updated_by: { data: user_id, _id: user_id },
    });
    return createdUser.save();
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserEmployeeDto,
    user_id: string
  ): Promise<UsersEmployees> {
    const { projects_id } = updateUserDto;
    const user = await this.userEmployeeModel.findByIdAndUpdate(
      id,
      {
        ...updateUserDto,
        projects_id: projects_id
          ? projects_id.map((each) => {
              return {
                data: each,
                _id: each,
              };
            })
          : undefined,
        role_id: {
          data: updateUserDto.role_id,
          _id: updateUserDto.role_id,
        },
        department_id: updateUserDto.department_id
          ? {
              data: updateUserDto.department_id,
              _id: updateUserDto.department_id,
            }
          : undefined,
        section_id: updateUserDto.section_id
          ? {
              data: updateUserDto.section_id,
              _id: updateUserDto.section_id,
            }
          : undefined,
        position_id: updateUserDto.position_id
          ? {
              data: updateUserDto.position_id,
              _id: updateUserDto.position_id,
            }
          : undefined,
        holiday_group_id: updateUserDto.holiday_group_id
          ? {
              data: updateUserDto.holiday_group_id,
              _id: updateUserDto.holiday_group_id,
            }
          : undefined,
        work_time_id: updateUserDto.work_time_id
          ? {
              data: updateUserDto.work_time_id,
              _id: updateUserDto.work_time_id,
            }
          : undefined,
        workplace_id: updateUserDto.workplace_id
          ? {
              data: updateUserDto.workplace_id,
              _id: updateUserDto.workplace_id,
            }
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
    await this.userEmployeeModel.findByIdAndUpdate(
      id,
      {
        is_active: false,
        updated_by: { data: user_id, _id: user_id },
      },
      { new: true }
    );
    return 'Delete user success.';
  }
}
