import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
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
  @Get()
  async getAllOrder() {
    const order = await this.orderService.getOrders();
    if (order.length > 0) return order;
    throw new HttpException('order not found', HttpStatus.NOT_FOUND);
  }
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    const getOrder = await this.orderService.getOrderById(id);
    if (!getOrder)
      throw new HttpException('Order no longer exits', HttpStatus.NOT_FOUND);
    return getOrder;
  }
  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.DeleteOrder(id);
  }
}
