import { Module } from '@nestjs/common';
import { BullMqModule } from '../modules/bullmq/bullmq.module';
import { MinioModule } from '../modules/minio/minio.module';
import { UploadModule } from '../modules/upload/upload.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({ isGlobal: true }),
    BullMqModule,
    UploadModule,
    MinioModule,
  ],
  providers: [],
})
export class AppModule {}
