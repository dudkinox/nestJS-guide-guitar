import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Req,
} from '@nestjs/common';
import { Body, Param, Post, Patch, Delete } from '@nestjs/common/decorators';
import { ControllerResponse } from 'src/model/response/ControllerResponse';
import { CreateProjectDto } from './dto/createProject.dto';
import { UpdateProjectDto } from './dto/updateProject.dto';
import { ProjectService } from './project.service';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from 'src/constants/uconnectConstant';
import { Projects } from 'src/model/schemas/projects';

@ApiTags('project-module')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get All List Of Projects',
    type: [Projects],
  })
  async getAllProject(): Promise<ControllerResponse> {
    Logger.log('getAllProject start time : ' + new Date().toLocaleString());

    try {
      return {
        description: 'Get All List Of Projects',
        data: await this.projectService.findAllProjects(),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getAllProject error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get project detail by id.',
    type: Projects,
  })
  @ApiParam({
    name: 'id',
    description: 'project_id',
    type: String,
    required: true,
  })
  async getOneProject(@Param('id') id: string): Promise<ControllerResponse> {
    Logger.log('getOneProject start time : ' + new Date().toLocaleString());

    try {
      return {
        description: 'Get project detail by id.',
        data: await this.projectService.findOneProject(id),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'getOneProject error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post()
  @ApiBody({
    type: CreateProjectDto,
    description: 'Request body for create project.',
  })
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('createProject start time : ' + new Date().toLocaleString());
    try {
      return {
        description: 'Create Project request.',
        data: await this.projectService.createProject(
          createProjectDto,
          req.user.payload?._id
        ),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'createProject error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'project id',
    type: String,
    required: true,
  })
  @ApiBody({
    type: UpdateProjectDto,
    description: 'Request Body for update project',
  })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('updateProject start time : ' + new Date().toLocaleString());

    try {
      return {
        description: 'Update project detail.',
        data: await this.projectService.updateProject(
          id,
          updateProjectDto,
          req.user.payload?._id
        ),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'updateProject error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'project id',
    type: String,
    required: true,
  })
  async deleteProject(
    @Param('id') id: string,
    @Req() req
  ): Promise<ControllerResponse> {
    Logger.log('deleteProject start time : ' + new Date().toLocaleString());

    try {
      return {
        description: '',
        data: await this.projectService.deleteProject(
          id,
          req.user.payload?._id
        ),
      };
    } catch (err) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ACCOUNT_SERVICE,
            description: 'deleteProject error : ' + err,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
