import {
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { ControllerResponse } from "src/model/response/ControllerResponse";
import { ApiTags } from "@nestjs/swagger";
import {
  StatusCodeModel,
  UconnectServiceConstant,
} from "src/constants/uconnectConstant";
import { StorageService } from "./storage.service";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("storage")
@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get()
  @ApiTags("storage")
  async getAllStorage(): Promise<ControllerResponse> {
    Logger.log("getAllUsers start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.storageService.getStorage(),
        description: "Get All List of Storage",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.STORAGE_SERVICE,
            description: "getAllStorage error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post("/images")
  @ApiTags("storage/image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: "image/jpeg" }),
          new MaxFileSizeValidator({
            maxSize: Number(UconnectServiceConstant.SIZE_STORAGE),
          }),
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<ControllerResponse> {
    Logger.log("uploadFile start time : " + new Date().toLocaleString());

    try {
      return {
        data: await this.storageService.uploadFile(file),
        description: "Upload File",
      };
    } catch (error) {
      throw new HttpException(
        {
          status: {
            code: StatusCodeModel.FAILED.code,
            message: StatusCodeModel.FAILED.message,
            service: UconnectServiceConstant.STORAGE_SERVICE,
            description: "uploadFile error : " + error,
          },
          data: null,
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
