import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserEmployeesSchema } from 'src/model/schemas/user-employee';
import { RsaUtil } from 'src/utils/rsa';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user_employees', schema: UserEmployeesSchema },
    ]),
    RsaUtil,
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
