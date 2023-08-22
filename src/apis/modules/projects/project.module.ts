import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsSchema } from 'src/model/schemas/projects';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'projects', schema: ProjectsSchema }]),
    LocationModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
