import { InjectModel } from "@nestjs/mongoose"
import { AddUserDto, deleteUserDto } from "./dto/user.dto"
import { User } from "src/DB/models/user.model"
import { Model } from "mongoose"
import { ConflictException } from "@nestjs/common"


export class UserService
{
    userModel :Model<User> 
    constructor(@InjectModel(User.name) userModel :Model<User> )
    {
           this.userModel = userModel
    }
   async getAllUsers()
    {
        let data = await this.userModel.find()
        console.log(...data);
        return data
        
    }
    async addUser(data:AddUserDto)
    {
        let {Phone,age,email,gender,name,password,role } = data
        let exists = await this.userModel.findOne({
            email: data.email
        }).select("_id")
        if (exists) {
            throw new ConflictException("User already Exist")
        }

        return await this.userModel.create(data)

    }
    async deleteUser(data:deleteUserDto)
    {
        let test = await this.userModel.findByIdAndDelete(data.id)
        return {
            message: "Deleted Sucessfully",
            user : test
        }
    }
}