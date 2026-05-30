import mongoose from "mongoose";
import { GenderEnums, ProviderEnums, RoleEnums } from "../enums/user.enums.js";
import { number } from "zod";



export const UserSchema = new mongoose.Schema({
    fullName:{type:String },
    fistName:{type:String },
    lastName:{type:String },
    password:{type:String,required:function(this){ return this.provider == ProviderEnums.System} },
    email:{type:String, unique:true,required:true},
    phone:{type:String,optional:true},
    gender:{type:Number,default: GenderEnums.Male},
    role:{type:number,default:RoleEnums.User},
    provider:{type:number,default:ProviderEnums.System},
    

})
