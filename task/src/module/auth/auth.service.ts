import { IUser } from "../../interface/user.interface.js";
import userModel from "../../database/model/user.model.js";
class AuthService {


    constructor() {
 
    }

   async signup(data:any)
    {
        return await userModel.create(data)
    }
    async login(data:any)
    {
        return await userModel.findOne(data)
    }
    async delete(data:any)
    {
        return await userModel.deleteOne(data)
    }
}