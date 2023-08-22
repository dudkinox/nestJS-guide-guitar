import { Injectable, PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { UconnectServiceConstant } from "src/constants/uconnectConstant";

@Injectable()
export class StorageService {
  constructor() {}

  async getStorage(): Promise<string> {
    try {
      return "";
    } catch (error) {
      throw error;
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<any> {
    try {
      return {
        name: file.filename,
        timestamp: new Date().toLocaleString(),
      };
    } catch (error) {
      throw error;
    }
  }
}
