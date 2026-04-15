import {UserModel} from "../../database/models/index.js";
import { BadRequestException, conflictException, NotFoundException , UnauthorizedException } from "../../common/utils/response/error.response.js";
import { ProviderEnum } from "../../common/enums/enum.service.js";
import { get } from "mongoose";
import { findOne, insertOne } from "../../database/database.service.js";
import bcrypt,{hash , compare} from "bcrypt";
import { env } from "../../../Config/index.js";
import { generateHash, compareHash } from "../../common/index.js";
import jwt from "jsonwebtoken";
import { generateToken } from "./../../common/index.js";
import { OAuth2Client } from "google-auth-library";






export const signup = async (data) => 
    {
        let {userName,email , password }= data;
        let existUser = await UserModel.findOne({email});
        if(existUser)
            {
                return conflictException({message : "Email already exist"})
            }    
        let hashedPassword = await generateHash(password);   
        let addedUser = await UserModel.insertOne({userName, email ,password: hashedPassword})
        return addedUser;    

    }

export const login = async(data,host)=>
    
{
    //await UserModel.findOne({email , password , provider:ProviderEnum.System})
        let {email , password} = data;
        let existUser = await findOne({model:UserModel,filter:{email , provider:ProviderEnum.System}})
        if(existUser)
            {
                // console.log(existUser.role);
                let { token } = generateToken(existUser,host)
                const isMatched = await compareHash(password,existUser.password); 
               
            
                // console.log(signature);
                if (isMatched) {
                   let {accessToken, refreshToken} = generateToken(existUser,host);
                    return { existUser , accessToken, refreshToken}};
                }
                NotFoundException({message:"User Not Found"})    
            }
            

    
        
      

export const forgetPassword = async(data)=>
    {
        let {email,otp,password} = data;
        let existedUser = await findOne({model:UserModel,filter:{email}})
        if (!existedUser)
            {
                throw BadRequestException({message:"User Not Found"})
            }
         let hashOtp = await get (`otp::${existedUser._id}`)
         if(await compareHash(otp,hashOtp))
            {
                if(await compareHash(password,existedUser.password))
                    {
                        throw BadRequestException({message:"New password must be different from the old one"})
                    }
                    else
                        {
                            let hashPassword = await generateHash(password);

                            let updatedUser = await UserModel.findOneAndUpdate({_id:existedUser._id},{$set:{password:hashPassword}},{new:true})
                            return updatedUser;
                        }
            }   
    }    

export const resetPassword = async(data)=>
    {
        let {email} = data;
        let existedUser = await findOne({UserModel,filter:{email}})
        if (!existedUser)
            {
                throw BadRequestException({message:"User Not Found"})
            }
        else
            {
                let code = Math.ceil(Math.random() * 10000);
                code = code.toString().padStart(4,0);

                await set({
                    key : `otp::${existedUser._id}`,
                    value : await generateHash(code),
                    ttl : 60 * 5
                })

                await sendEmail({
                    to : existedUser.email,
                    subject : "Password Reset OTP",
                    html : `<h1>reset password</h1>
                    <p> ${code}</p>
                    ` 
                })
            }    
    }    

export const getUserById = async (userId)=>
    {
        
        let user = await findOne({model:UserModel,filter:{_id:userId},select:"-password"})
        if(!user)            {
                throw NotFoundException({message:"User Not Found"})  
            }
        return user;
    }    

export const signupMail = async (data)=>
    {
        const client = new OAuth2Client(env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: data.token,
            audience:""
        })
        const payload = ticket.getPayload();
        if(payload.email_verified)
            {
                throw BadRequestException("email not verified") 
            }
            let exsistUser = await findOne({model:UserModel,filter:{email: payload.email}})
            if(exsistUser)
                {
                    throw conflictException("user already exist")
                }
                else
                    {
                        let addedUser = await insertOne({
                            model:UserModel,
                            data:
                            {
                                userName: payload.name,
                                email: payload.email
                            }    
                        })
                       if (addedUser)
                        {
                            return addedUser
                       }else
                        {
                            throw BadRequestException("fe 7aga 8lt")
                        } 

                    }
    }