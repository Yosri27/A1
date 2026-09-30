import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { GenderEnum } from "src/Enums/Gender.Enum";
import { RoleEnum } from "src/Enums/Role.Enum";
import * as bcrypt from 'bcrypt'
import { env } from "src/config";

@Schema()

export class User
{

     @Prop({type : String , required : true})   
     name!:string
     @Prop({type : String , required : true,unique:true})    
     email!:string
     @Prop({type : String , required : true, trim : true})
     password!:string
     @Prop({type : String , required : true})
     Phone!:string
     @Prop({type : Number})
     age!:Number
     @Prop({type : String ,default:RoleEnum.USER})
     role!:string
     @Prop({type : String , default:GenderEnum.MALE, required : true})
     gender!:string
     @Prop({type : Boolean , default:true})
     isActive!:boolean
     @Prop({type : Boolean , default:false})
     verified!:boolean

}


export  let UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save',function(){

     this.password = bcrypt.hashSync(this.password,Number(env.salt))
})


export const userModel = MongooseModule.forFeature([{name:User.name,schema:UserSchema}])
