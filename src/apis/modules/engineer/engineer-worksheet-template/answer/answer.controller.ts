import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req } from "@nestjs/common";
import { StatusCodeModel, UconnectServiceConstant } from "src/constants/uconnectConstant";
import { QueryAnswerDto } from "./dto/queryAnswer.dto";
import { AnswerService } from "./answer.service";
import { CreateAnswerDto } from "./dto/createAnswer.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags("Answer Module")
@Controller('worksheet-template')
export class AnswerController {
  constructor(private answerService: AnswerService) { }

  @Get('/answer')
  async getAllAnswer(@Query() query: QueryAnswerDto) {
    try {
      return {
        description: "get all answer",
        data: await this.answerService.getAllAnswerWorksheet(query)
      }
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAllAnswer error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('/answer/:id')
  async getAnswerById(@Param('id') id: string) {
    try {
      return {
        description: "get answer by id",
        data: await this.answerService.getAnswerWorksheetById(id)
      }
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "getAnswerById error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('/answer')
  async createAnswer(
    @Body() createAnswerDto: CreateAnswerDto,
    @Req() req
  ) {
    try {
      return {
        description: "create answer by id",
        data: await this.answerService.createAnswerWorksheet(createAnswerDto,
          req.user.payload?._id
        ),
      };

    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "createAnswer error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch('/answer/:id')
  async updateAnswer() {
    return 'Developing'
  }

  @Delete('/answer/:id')
  async deleteAnswer(@Param('id') id: string, @Req() req) {
    try {
      return {
        description: "delete answer by id",
        data: await this.answerService.deleteAnswerWorksheet(id,
          req.user.payload?._id
        ),
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.ENGINEERING_SERVICE,
            description: "deleteAnswer error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}