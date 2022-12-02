import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ordersDto } from './dto/order.dto';
import { Orders, ordersDocument } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Orders.name) private orderModel: Model<ordersDocument>,
  ) {}
  async createOrder(orderDetailes: ordersDto) {
    const findOrder = await this.orderModel.findOne({
      fullName: orderDetailes.fullName,
    });
    if (!findOrder) {
      const orderToSave = new this.orderModel(orderDetailes);
      return orderToSave.save();
    }
  }
  async getOrders() {
    return await this.orderModel.find({});
  }
  async getOrderById(id: number): Promise<Orders> {
    return await this.orderModel.findById({ _id: id });
  }
  async DeleteOrder(id: number) {
    const deleteOrder = await this.orderModel.findById({ _id: id });
    if (!deleteOrder)
      return new HttpException(
        'Order with id does not exit',
        HttpStatus.NOT_FOUND,
      );
    return this.orderModel.deleteOne({ _id: id });
  }
  async updateOrder() {
    return await this.orderModel.find({});
  }
  async makePayment() {
    return await this.orderModel.create();
  }
}
