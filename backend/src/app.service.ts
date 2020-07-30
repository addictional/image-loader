import { Injectable } from '@nestjs/common';

export interface IFile{
  fieldname : string;
  originalname : string;
  encoding : string;
  mimetype : string;
  buffer : Buffer;
  size : number
}

@Injectable()
export class AppService {
  static readonly UPLOAD_DIR = '/app/upload';
  
  uploadeImage() {
    return "OK";
  }
}
