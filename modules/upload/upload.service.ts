// upload.service.ts
import { Injectable } from '@nestjs/common';
import { MinioService } from '../minio/minio.service';

@Injectable()
export class UploadService {
  constructor(private readonly minioService: MinioService) {}

  async uploadToMinio(buffer: Buffer, originalName: string) {
    const bucket = process.env.MINIO_BUCKET || 'wedding-photos';
    const fileName = `${Date.now()}_${originalName}`;

    await this.minioService.uploadFile(bucket, fileName, buffer);
    return fileName;
  }
}
