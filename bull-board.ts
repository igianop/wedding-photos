import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter'; // Use BullAdapter for Bull v3
import { ExpressAdapter } from '@bull-board/express';
import { INestApplication } from '@nestjs/common';
import { Queue } from 'bull';

export function setupBullBoard(app: INestApplication, queue: Queue) {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues'); // Base path for Bull Board

  createBullBoard({
    queues: [new BullAdapter(queue)], // Use BullAdapter for Bull v3
    serverAdapter,
  });

  // Register the Bull Board route
  app.use('/admin/queues', serverAdapter.getRouter());
}
