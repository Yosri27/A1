import { env } from "../../../config/env.service.js";
import bcrypt from "bcrypt"

export class SecurityService{
 generateHash = async ({plaintext, salt = env.salt}:
    {plaintext: string,salt?:string}): Promise<string> =>
    {
        
        
        return await bcrypt.hash(plaintext,Number(salt))
    }


 compareHash = async ({plaintext, cyphertext}:
    {plaintext: string,cyphertext:string}): Promise<boolean> =>
    {
        return await bcrypt.compare(plaintext,cyphertext)
    }
}