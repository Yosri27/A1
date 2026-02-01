
import {UserModel} from '../models/user.js'

export const addUser = async (data) => {
  let {name,email,password} =data;
  let userData = await UserModel.create({name,email,password});

  return userData;
}
export const LogUser = async (data)=>
    {
        let {email,password} = data
        let userData = await UserModel.findOne({where:{email : email ,password : password }})
        return userData;

    }