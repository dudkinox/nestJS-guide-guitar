import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectModule } from "./modules/projects/project.module";
import { AccountModule } from "./modules/account/account.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UconnectServiceConstant } from "src/constants/uconnectConstant";
import { LocationModule } from "./modules/location/location.module";
import { SparePartsModule } from "./modules/spare-parts/spare-parts.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./modules/auth/guards/jwtAccessGuard";
import { MachineryModule } from "./modules/machinery/machinery.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { RolesModule } from "./modules/roles/roles.module";
import { EngineeringModule } from "./modules/engineer/engineering.module";
import { StorageModule } from "./modules/storage/storage.module";
import { HouseModule } from "./modules/house/house.module";
import { MeterModule } from "./modules/meter/meter.module";
import { SystemsModule } from './modules/systems/systems.module';
import { PermissionsModule } from './modules/permissions/permissions.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${UconnectServiceConstant.USERNAME_DB}:${UconnectServiceConstant.PASSWORD_DB}@uconnect.qxwf13v.mongodb.net/?retryWrites=true&w=majority`
    ),
    AuthModule,
    AccountModule,
    ProjectModule,
    EngineeringModule,
    LocationModule,
    SparePartsModule,
    MachineryModule,
    MeterModule,
    NotificationModule,
    RolesModule,
    StorageModule,
    HouseModule,
    SystemsModule,
    PermissionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ApisModule {}
