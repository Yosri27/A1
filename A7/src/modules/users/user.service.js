
import { userModel } from "./../../database/models/user.model.js";

export const getAllUsers = async () => {
    let userData = await userModel.find().toArray();
    return userData;
}
