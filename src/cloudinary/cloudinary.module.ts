import { Module } from '@nestjs/common';
import { CloudinaryController } from './controller/controller.controller';
import { ServiceService } from './service/service.service';

@Module({
  // controllers: [],
  providers: [ServiceService, CloudinaryController],
  exports: [ServiceService, CloudinaryController],
})
export class CloudinaryModule {}
