import { Module } from "@nestjs/common";
import { StorageController } from "./storage.controller";
import { StorageService } from "./storage.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UconnectServiceConstant } from "src/constants/uconnectConstant";

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: UconnectServiceConstant.PATH_STORAGE,
        filename: (req, file, cb) => {
          // Generating a unique random filename with extension
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
