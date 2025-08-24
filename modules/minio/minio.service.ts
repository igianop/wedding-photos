import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { Readable } from 'stream';

@Injectable()
export class MinioService implements OnModuleInit {
  private minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT') || 'localhost',
      port: parseInt(this.configService.get<string>('MINIO_PORT') || '9000'),
      useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY') || 'minioadmin',
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY') || 'minioadmin',
    });

    await this.ensureBucketExists();
  }

  private async ensureBucketExists() {
    const bucket =
      this.configService.get<string>('MINIO_BUCKET') || 'wedding-photos';
    const exists = await this.minioClient.bucketExists(bucket);
    if (!exists) {
      await this.minioClient.makeBucket(bucket, 'us-east-1');
      console.log(`Created bucket: ${bucket}`);
    }
  }

  async uploadFile(bucket: string, fileName: string, content: Buffer) {
    try {
      await this.ensureBucketExists();
    } catch (error) {
      console.error('Error ensuring bucket exists:', error);
      throw error;
    }

    try {
      const file = await this.minioClient.putObject(bucket, fileName, content);

      console.log(`File uploaded successfully: ${JSON.stringify(file)}`);
      return { fileName, bucket };
    } catch (error) {
      console.error(`Error uploading file:`, error);
      throw error;
    }
  }
}
