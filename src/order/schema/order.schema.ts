import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ordersDocument = Orders & Document;

@Schema()
export class Orders {
    @Prop()
    fullName: string;

  @Prop()
  contantNumber: string;

  @Prop()
  location: string;

  @Prop()
  numberofItems: number;


  @Prop()
  modeOfPayment: string;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);