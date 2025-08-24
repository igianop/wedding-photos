import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupBullBoard } from '../bull-board';
import { getQueueToken } from '@nestjs/bull';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve static files from the public directory
  app.use('/uploader', express.static(join(process.cwd(), 'public')));

  // Get the queue instance
  const uploadQueue = app.get(getQueueToken('upload-queue'));
  // Setup Bull Board
  setupBullBoard(app, uploadQueue);


  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Bull Board is available on: http://localhost:3000/admin/queues`);
  console.log(`Upload page is available on: http://localhost:3000`);
}
bootstrap();
