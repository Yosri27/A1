import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { User } from "./user.model";

@Schema()

export class Product
{

    @Prop({type: String, required: true})
    titleAr




    @Prop({type : Types.ObjectId , ref: User.name })
    createdBy

}


export  let ProductSchema = SchemaFactory.createForClass(Product)
