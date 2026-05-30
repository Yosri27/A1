import { config } from "dotenv";
import path from "path"
config({path:path.resolve(`./.env.${process.env.NODE_ENV}`)})



const mongoURL = process.env.MONGO_URI as string;
const port = process.env.PORT as string
const mood = process.env.MOOD as string
const salt = process.env.SALT as string
const JWT_KEY = process.env.JWT_KEY as string
const ADMIN_SIGNATURE = process.env.JWT_ADMIN_SIGNATURE as string
const USER_SIGNATURE = process.env.JWT_USER_SIGNATURE as string
const Redis_URL = process.env.REDIS_URI as string
const userRefreshSignature = process.env.JWT_USER_REFRESH_SIGNATURE as string
const adminRefreshSignature = process.env.JWT_ADMIN_REFRESH_SIGNATURE as string
const JWT_Audiance = process.env.JWT_AUDIENCE as string
const EmailUser = process.env.EmailUser as string
const EmailPass = process.env.EmailPass as string
const aws_bucket_name = process.env.aws_bucket_name as string
const aws_region = process.env.aws_region as string
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID as string
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY as string
export const env ={port,mongoURL,mood,salt,JWT_KEY,ADMIN_SIGNATURE,USER_SIGNATURE,Redis_URL,userRefreshSignature,adminRefreshSignature,JWT_Audiance,EmailUser,EmailPass,aws_bucket_name,aws_region,AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY};

