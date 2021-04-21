import { UserModule } from './modules/user/user.module';
import { UserController } from './modules/user/user.controller';
import { FileModule } from '@/modules/file/file.module';
import { FileController } from '@/modules/file/file.controller';
import { AuthModule } from './modules/auth/auth.module';
import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { StatusMonitorModule } from 'nest-status-monitor';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from '@/modules/email/email.module';
import statusMonitorConfig from '@/config/statusMonitor';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,
    FileModule,
    AuthModule,
    // 配置集成
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('email'),
      inject: [ConfigService],
    }),
    StatusMonitorModule.setUp(statusMonitorConfig),
    MongooseModule.forRoot(
      'mongodb://zao:123456@localhost:27017/ad?authSource=admin',
      {
        connectionFactory: (connection) => {
          console.log('db connect success');
          return connection;
        },
      },
    ),
    EmailModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
