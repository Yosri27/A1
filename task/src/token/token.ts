import jwt from "jsonwebtoken"
import { env } from "../config/env.service.js"


class TokenService
{
     signature:string = ""
     Aud:string = ""
     data:any
    constructor()
    {
        this.signature = this.signature
        this.Aud = this.Aud
    }
    generateToken(user):Promise<string> 
    {
            switch (user.role) {
                case "Admin":
                this.signature = env.Admin_signature
                this.Aud = "Admin"
                    break;
            
                default:
                    this.signature = env.User_signature
                    this.Aud = "User"
                    break;
            }
        this.data = jwt.sign({id: user.id},this.signature,{ expiresIn:"30m", audience:this.Aud}) 
    }

    verifyToken(token:string):Promise<any>
    {
        try {
            const decoded = jwt.verify(token,this.signature,{audience:this.Aud});
            return decoded
        } catch (error) {
            throw new Error("Invalid token");
        }
    }
    
}