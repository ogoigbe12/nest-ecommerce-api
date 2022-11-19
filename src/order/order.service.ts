import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ordersDto } from './dto/order.dto';
import { Orders, ordersDocument } from './schema/order.schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Orders.name) private orderModel: Model<ordersDocument>
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
}
