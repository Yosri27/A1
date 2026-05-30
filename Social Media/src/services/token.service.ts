import jwt, { JwtPayload } from "jsonwebtoken"
import {env} from "../config/index.js"
import { BadRequestException } from "../common/exceptions/application.exceptions.js";


export class TokenService
{

    constructor()
    {
    
    }
 generateToken(user: any) : {accessToken: string, refreshToken: string}
    {
         
                        let signature= undefined;
                        let audience = undefined;
                        let refreshSignature = undefined;
                        switch (user.role) {
                            case "Admin":
                                signature = env.ADMIN_SIGNATURE;
                                refreshSignature = env.adminRefreshSignature;
                                audience ="Admin";
                                break;
                        
                            default:
                                signature = env.USER_SIGNATURE;
                                refreshSignature = env.userRefreshSignature;
                                audience = "User";
                                break;
                        }
                        // console.log(signature);
                        
 let accessToken = jwt.sign({id : user._id},signature,{
        audience,
        expiresIn:"30m"
})
// if (!refreshSignature) refreshSignature = signature;
let refreshToken = jwt.sign({id : user._id},refreshSignature,{
    expiresIn:"1y",
    audience
})
return {accessToken, refreshToken}
}
 decodedToken(token: string){

        let decoded = jwt.decode(token) as JwtPayload
        let signature = undefined;
        if(!decoded)
            {
                throw new BadRequestException("Invalid token");
            }
        switch (decoded.aud) {
            case "Admin":
                signature = env.ADMIN_SIGNATURE;
                break;
        
            default:
                signature = env.USER_SIGNATURE;
                break;
        }
        let decodedData = jwt.verify(token,signature);
        return decodedData;

}    

decodedRefreshToken(refreshToken: string)
{
    let decoded = jwt.decode(refreshToken) as JwtPayload
    let refreshSignature = undefined;
    switch (decoded.aud)
    {
        case "Admin":
            refreshSignature = env.adminRefreshSignature;
            break;
            default:
            refreshSignature = env.userRefreshSignature
            break;    
    }
    let decodedData = jwt.verify(refreshToken,refreshSignature);
    return decodedData;
}




async generateAccessToken(refreshToken: string)
    {
        let decoded = this.decodedRefreshToken(refreshToken);
        let signature = undefined;
        let audience = undefined;
        // switch (decoded.aud) {
        //     case "Admin":
        //         signature = env.ADMIN_SIGNATURE;
        //         audience ="Admin";
        //         break;
        //         case "User":
        //             signature = env.USER_SIGNATURE;
        //             audience = "User";
        //             break;
        //         }
        //         let accessToken = jwt.sign({id : decoded.id},signature,{
        //             expiresIn:"30m",
        //             audience
        //         })
        //         return accessToken;
        //     }
            
            
    }  



}