import { config } from "dotenv";
import path from "path"
config({path:path.resolve(`./.env.${process.env.NODE_ENV}`)})

const salt = process.env.SALT as string
const Admin_signature = process.env.Admin_signature as string
const User_signature = process.env.User_signature as string
const mongourl = process.env.MONGO_URI as string
export const env = {salt,Admin_signature,User_signature,mongourl}