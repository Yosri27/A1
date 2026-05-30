import mongoose from "mongoose";
import type { IUser } from "../../interface/user.interface.js";


const userSchema = new mongoose.Schema(
    {
        name:
        {
            type: string,
            required: true,
        },
        email:
        {
            type: string,
            required: true,
            unique : true
        },
        password:
        {
            type: string,
            required: true
        },
        age:
        {
            type:number,
            optional: true
        }
    })

    export const userModel = mongoose.model<IUser>("user",userSchema)
    export default userModel