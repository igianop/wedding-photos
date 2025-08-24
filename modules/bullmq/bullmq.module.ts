import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { BullmqController } from './bullmq.controller';
import { BullmqProcessor } from './bullmq.processor';
import { UploadService } from '../upload/upload.service';
import { MinioService } from '../minio/minio.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'upload-queue',
    }),
  ],
  controllers: [BullmqController],
  providers: [BullmqProcessor, UploadService, MinioService],
})
export class BullMqModule {}
