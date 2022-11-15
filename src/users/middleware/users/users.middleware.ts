import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UsersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.header['token'] === 'my-token') {
      throw new BadRequestException('token does not exits');
    }
    // console.log('Request.header');
    next();
  }
}
