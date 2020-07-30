import {FileInterceptor} from '@nestjs/platform-express';
import { Controller,Post,Get,UseInterceptors,UploadedFile, } from '@nestjs/common';
import { AppService,IFile } from './app.service';
import { diskStorage } from 'multer';
import {setFileName,fileFilter} from './app.utilities';



@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file',{
    storage : diskStorage({
      destination: function (req, file, cb) {
        cb(null, '/app/upload')
      },
      filename: setFileName,
    }),
    fileFilter
  }))
  uploadFile(@UploadedFile() file : IFile) : string {
    return this.appService.uploadeImage();
  }
}
