import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ordersDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() orderData: ordersDto) {
    const newOrder = await this.orderService.createOrder(orderData);
    if (newOrder) return { msg: 'Order Placed' };
    return new HttpException('Order already exit', HttpStatus.BAD_REQUEST);
  }
}
