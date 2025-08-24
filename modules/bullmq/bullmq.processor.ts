import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { UploadService } from '../upload/upload.service';

@Processor('upload-queue')
export class BullmqProcessor {
  constructor(private readonly uploadService: UploadService) {}

  @Process('upload-job')
  async handleUpload(
    job: Job<{ buffer: string; originalname: string; mimetype: string }>,
  ) {
    const { buffer, originalname } = job.data;
    const decodedBuffer = Buffer.from(buffer, 'base64');

    await this.uploadService.uploadToMinio(decodedBuffer, originalname);
  }
}
