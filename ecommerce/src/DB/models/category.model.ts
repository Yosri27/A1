import mongoose, { Types, model } from "mongoose";
import * as bcrypt from 'bcrypt'
import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.model";

@Schema({
    timestamps: true,
    strict: true
})
export class Category {
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

        @Prop({
            ref : Category.name,
            required : true,
            type : String
        })
        categoryId! : string

}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.pre('validate', async function (next) {

    if (this.isModified('name')) {
        this.slug = this.name.split(" ").join("-").toLowerCase().trim()
    }
})


export const CategoryModel = MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])