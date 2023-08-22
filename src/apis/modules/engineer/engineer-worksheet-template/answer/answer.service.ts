import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswerModel } from 'src/model/schemas/engineer/models/answer-model';
import { CreateAnswerDto } from './dto/createAnswer.dto';
import { QueryAnswerDto } from './dto/queryAnswer.dto';

export class AnswerService {
  constructor(
    @InjectModel('answers')
    private readonly answerModel: Model<AnswerModel>
  ) {}

  async getAllAnswerWorksheet(queryAnswerDto?: QueryAnswerDto) {
    try {
      if (queryAnswerDto.type === 'repair' && queryAnswerDto.repair_id) {
        return await this.answerModel.find({
          engineer_repair_id: queryAnswerDto.repair_id,
        });
      } else if (queryAnswerDto.type === 'plan' && queryAnswerDto.plan_id) {
        return await this.answerModel.find({
          engineer_plans_id: queryAnswerDto.plan_id,
        });
      }
      return await this.answerModel
        .find()
        .populate(['question_id.data', 'choices_id.data']);
    } catch (error) {
      Logger.error('[GET] /apis/worksheet-template/answer');
      throw error;
    }
  }

  async getAnswerWorksheetById(id: string) {
    try {
      return await this.answerModel.findById(id);
    } catch (error) {
      Logger.error('[GET] /apis/worksheet-template/answer/:id : ' + error);
      throw error;
    }
  }

  async createAnswerWorksheet(
    createAnswerDto: CreateAnswerDto,
    user_id: string
  ) {
    try {
      const { questions_id, choices_id, engineer_worksheet_template_id } =
        createAnswerDto;
      return await this.answerModel.create({
        ...createAnswerDto,
        engineer_worksheet_template_id: {
          data: engineer_worksheet_template_id,
          _id: engineer_worksheet_template_id,
        },
        questions_id: { data: questions_id, _id: questions_id },
        choices_id: { data: choices_id, _id: choices_id },
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      Logger.error('[POST] /apis/worksheet-template/answer');
      throw error;
    }
  }

  async deleteAnswerWorksheet(id: string, user_id: string) {
    try {
      return await this.answerModel.findByIdAndUpdate(id, {
        is_active: false,
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      Logger.error('[DELETE] /apis/worksheet-template/answer');
      throw error;
    }
  }
}
