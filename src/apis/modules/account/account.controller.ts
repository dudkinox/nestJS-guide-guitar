import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  Logger,
  HttpException,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiDefaultResponse,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserEmployeeDto } from './dto/updateUserEmployee.dto';
import { AccountService } from './account.service';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { UsersEmployees } from 'src/model/schemas/user-employee';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { CreateUserEmployeeDto } from './dto/createUserEmployee.dto';
import { UserQuery } from './dto/queryUser.dto';

@ApiTags('accounts-service')
@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('user-employees')
  @ApiResponse({
    status: 200,
    description: 'Get all users data.',
    type: UsersEmployees,
  })
  @ApiDefaultResponse({ description: 'Get all users data.' })
  async getAllUsers(@Query() query: UserQuery): Promise<ControllerResponse> {
    Logger.log('getAllUsers start time : ' + new Date().toLocaleString());

    try {
      return {
        data: await this.accountService.getAllUsers(query),
        description: 'Get all users data.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getAllUsers error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('user-employees/id-card/:id_card')
  @ApiDefaultResponse({
    description: 'Get single user data by id card.',
  })
  @ApiParam({
    name: 'id_card',
    description: 'User id card.',
    type: String,
    required: true,
    example: '1234567890123',
  })
  async getUserByIdCard(
    @Param('id_card') id_card: string
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.accountService.getUserByIdCard(id_card),
        description: 'Get single user data by id card.',
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'Get single user data by id card.',
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('user-employees/:id')
  @ApiResponse({
    status: 200,
    description: 'Get single user data by id.',
    type: UsersEmployees,
  })
  @ApiParam({
    name: 'id',
    description: 'User id.',
    type: String,
    required: true,
    example: '5f9b3b3b9b9b9b9b9b9b9b9b',
  })
  @ApiDefaultResponse({ description: 'Get single user data by id.' })
  async getUserById(@Param('id') id: string): Promise<ControllerResponse> {
    try {
      return {
        data: await this.accountService.getUserById(id),
        description: 'Get single users data by id.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getUserById error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('user-employees')
  @ApiBody({
    type: CreateUserEmployeeDto,
    description: 'Request body for creating a new account.',
  })
  async createUser(
    @Body() createUserDto: CreateUserEmployeeDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.accountService.createUser(
          createUserDto,
          req.user.payload?._id
        ),
        description: 'Create user request.',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'Create user request error : ' + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch('user-employees/:id')
  @ApiParam({
    name: 'id',
    description: 'User id.',
    type: String,
    required: true,
    example: '5f9b3b3b9b9b9b9b9b9b9b9b',
  })
  @ApiBody({
    type: UpdateUserEmployeeDto,
    description: 'Request body for update a exist account.',
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserEmployeeDto: UpdateUserEmployeeDto,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.accountService.updateUser(
          id,
          updateUserEmployeeDto,
          req.user.payload?._id
        ),
        description: 'Update user by id.',
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'Update user by id error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete('user-employees/:id')
  @ApiParam({
    name: 'id',
    description: 'User id.',
    type: String,
    required: true,
    example: '5f9b3b3b9b9b9b9b9b9b9b9b',
  })
  @ApiDefaultResponse({ description: 'Request delete for a exist account.' })
  async deleteUser(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    try {
      return {
        data: await this.accountService.deleteUser(id, req.user.payload?._id),
        description: 'Delete account.',
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'Delete account error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
