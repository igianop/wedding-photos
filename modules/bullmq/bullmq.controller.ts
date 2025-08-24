import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';


@Controller('upload')
export class BullmqController {
  constructor(
    @InjectQueue('upload-queue') private readonly uploadQueue: Queue,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    for (const file of files) {
      await this.uploadQueue.add('upload-job', {
        buffer: file.buffer.toString('base64'),
        originalname: file.originalname,
        mimetype: file.mimetype,
      });
    }
    return { message: 'Upload in progress' };
  }
}
