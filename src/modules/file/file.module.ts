import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';
import * as nuid from 'nuid';

@Module({
  imports:[
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          // 自定义文件名
          const filename = `${nuid.next()}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
          // return  cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}