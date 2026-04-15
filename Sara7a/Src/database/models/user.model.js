import mongoose from "mongoose";
import { GenderEnum, ProviderEnum ,RoleEnum} from "../../common/enums/enum.service.js";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 50
    },
    lastName:
    {
       type : String,
        required : true,
        minlength : 3,
        maxlength : 50   
    },
    email:
    {
        type : String,
        required : true,
        unique : true,
    

    },
    password:
    {
        type: String,
        required : true,
    },
    phone : String,
    DOB : Date,
    gender:
    {
        type : String,
        enum : Object.values(GenderEnum),
        default: GenderEnum.Male
    },
    provider:
    {
        type : String,
        enum : Object.values(ProviderEnum),
        default : ProviderEnum.System
    },
    role:
    {
        type : String,
        enum : Object.values(RoleEnum),
        default : RoleEnum.User

    }

})


userSchema.virtual('userName').set(function(value){

    let [firstName , lastName] = value.split(' ')
    this.firstName = firstName
    this.lastName = lastName

}).get(function(){
    return `${this.firstName} ${this.lastName}`
})


export const UserModel = mongoose.model("User",userSchema)