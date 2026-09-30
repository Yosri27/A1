import mongoose, { Types, model } from "mongoose";
import * as bcrypt from 'bcrypt'
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.model";

@Schema({
    timestamps: true,
    strict: true
})
export class Brand {
    @Prop(
        {
            type: String,
            required: true,
            unique : true
        })
    name!: string

    @Prop({
        type: String,
        required: true,
        unique: true,
        trim: true
    })
    slug!: string

    @Prop(
        {
            type: String,
            required: true,
            unique: true,
            trim: true

        })
        image! : string
        @Prop({
            ref : User.name,
            required : true,
            type : Types.ObjectId
        })
        createdBy!: Types.ObjectId

}

export const brandSchema = SchemaFactory.createForClass(Brand)

brandSchema.pre('validate', async function (next) {

    if (this.isModified('name')) {
        this.slug = this.name.split(" ").join("-").toLowerCase().trim()
    }
})


export const brandModel = MongooseModule.forFeature([{ name: Brand.name, schema: brandSchema }])