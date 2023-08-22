import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EngineerWorksheetTemplate } from 'src/model/schemas/engineer/engineer-worksheet-template';
import { DetailsWorkSheetTemplate } from 'src/model/schemas/engineer/models/details-model';
import { QuestionChoices } from 'src/model/schemas/engineer/models/question-choices-model';
import { QuestionWorkSheetTemplate } from 'src/model/schemas/engineer/models/questions-model';
import { CreateWorksheetTemplateDto } from './dto/createWorksheetTemplate.dto';
import { UpdateWorksheetTemplateDto } from './dto/updateWorksheetTemplate.dto';

@Injectable()
export class EngineerWorkSheetTemplateService {
  constructor(
    @InjectModel('worksheet_templates')
    private readonly worksheetTemplateModel: Model<EngineerWorksheetTemplate>,
    @InjectModel('questions')
    private readonly questionModel: Model<QuestionWorkSheetTemplate>,
    @InjectModel('choices')
    private readonly choiceModel: Model<QuestionChoices>,
    @InjectModel('details')
    private readonly detailModel: Model<DetailsWorkSheetTemplate>
  ) {}

  async getAllWorksheetTemplate() {
    try {
      return await this.worksheetTemplateModel
        .find({ is_active: true })
        .populate([
          'projects_id',
          'created_by',
          'updated_by',
          'details.data',
          'questions.data',
        ]);
    } catch (error) {
      Logger.error('[GET] /apis/worksheet-template : ' + error);
      throw error;
    }
  }
  async getByIdWorksheetTemplate(id: string) {
    try {
      return await this.worksheetTemplateModel
        .findById(id)
        .populate([
          'projects_id',
          'created_by',
          'updated_by',
          'details.data',
          'questions.data',
        ]);
    } catch (error) {
      Logger.error('[GET] /apis/worksheet-template/:id : ' + error);
      throw error;
    }
  }
  async createWorksheetTemplate(
    createWorksheetTemplateDto: CreateWorksheetTemplateDto,
    user_id: string
  ) {
    try {
      const { header, questions, projects_id, details } =
        createWorksheetTemplateDto;
      const questionsDocument = [];
      const detailsDocument = [];

      // Create Each Detail
      for await (const eachDetail of details) {
        const createdDetail = await this.detailModel.create(eachDetail);
        detailsDocument.push({
          data: createdDetail,
          _id: createdDetail._id,
        });
      }

      // Create Each Question
      for await (const question of questions) {
        const choices = [];
        for await (const choice of question.choices) {
          const createdChoices = await this.choiceModel.create(choice);
          choices.push({ data: createdChoices, _id: createdChoices._id });
        }

        const createdQuestion = await this.questionModel.create({
          ...question,
          choices: choices,
          created_by: { data: user_id, _id: user_id },
          updated_by: { data: user_id, _id: user_id },
        });
        questionsDocument.push({
          data: createdQuestion,
          _id: createdQuestion._id,
        });
      }
      return await this.worksheetTemplateModel.create({
        projects_id: { data: projects_id, _id: projects_id },
        header: header,
        details: detailsDocument,
        questions: questionsDocument,
        created_by: { data: user_id, _id: user_id },
        updated_by: { data: user_id, _id: user_id },
      });
    } catch (error) {
      Logger.error('[POST] /apis/worksheet-template/ : ' + error);
      throw error;
    }
  }
  async updateWorksheetTemplate(
    id: string,
    updateWorkSheetTemplateDto: UpdateWorksheetTemplateDto,
    user_id: string
  ) {
    try {
      const { header, questions, projects_id, details } =
        updateWorkSheetTemplateDto;

      for await (const question of questions) {
        await this.questionModel.findByIdAndUpdate(
          question.id,
          {
            ...question,
            projects_id: projects_id
              ? { data: projects_id, _id: projects_id }
              : undefined,
            details: details ? { data: details, _id: details } : undefined,
            questions: questions
              ? { data: questions, _id: questions }
              : undefined,
            updated_by: { data: user_id, _id: user_id },
          },
          {
            new: true,
          }
        );
      }

      return await this.worksheetTemplateModel.findByIdAndUpdate(
        id,
        {
          projects_id: projects_id
            ? { data: projects_id, _id: projects_id }
            : undefined,
          header: header,
          updated_by: { data: user_id, _id: user_id },
        },
        {
          new: true,
        }
      );
    } catch (error) {
      Logger.error('[PATCH] /apis/worksheet-template/:id : ' + error);
      throw error;
    }
  }
  async deleteWorksheetTemplate(id: string, user_id: string) {
    try {
      return await this.worksheetTemplateModel.findByIdAndUpdate(
        id,
        { is_active: false, updated_by: { data: user_id, _id: user_id } },
        { new: true }
      );
    } catch (error) {
      Logger.error('[DELETE] /apis/worksheet-template/:id : ' + error);
      throw error;
    }
  }
}
