import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '@/schemas/user.schema';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';


@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
    ]),
  ],
  providers: [ UserService, EmailService],
  exports: [UserService],
})
export class UserModule {}
