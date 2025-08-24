// src/app.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as jwt from 'jsonwebtoken';

@Controller()
export class UploadPageController {
  @Get('uploader')
  getUploader(@Res() res: Response) {
    return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }

  @Get('upload-token')
  getUploadToken() {
    const token = jwt.sign(
      {}, // payload αν θέλεις π.χ. { role: 'uploader' }
      process.env.UPLOAD_JWT_SECRET || 'super_secret_key',
      { expiresIn: '10m' } // ισχύς 10 λεπτά
    );

    return { token };
  }
}
