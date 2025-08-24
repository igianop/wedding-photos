import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MinioModule } from 'modules/minio/minio.module';
import { UploadPageController } from './upload-page.controller';

@Module({
  imports: [MinioModule],
  controllers: [UploadController, UploadPageController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
