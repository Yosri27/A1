import {env} from './../../../Config/index.js'
import jwt from 'jsonwebtoken'

export const generateToken = (User,host) =>
    {
         
                        let signature= undefined;
                        let audience = undefined;
                        let refreshSignature = undefined;
                        switch (User.role) {
                            case "Admin":
                                signature = env.ADMIN_SIGNATURE;
                                audience ="Admin";
                                break;
                        
                            default:
                                signature = env.USER_SIGNATURE;
                                audience = "User";
                                break;
                        }
                        // console.log(signature);
                        
 let accessToken = jwt.sign({id : User._id},signature,{
        expiresIn:"30m",
        // notBefore:"1m",
        // issuer:`${host}`,
        audience
})
let refreshToken = jwt.sign({id : User._id},refreshSignature,{
    expiresIn:"1y",
    // notBefore:"1m",
    // issuer:`${host}`,
    audience
})
return {accessToken, refreshToken}
    }
export const generateAccessToken = async (refreshToken) =>
    {
        let decoded = decodedRefreshToken(refreshToken);
        let signature = undefined;
        let audience = undefined;
        switch (decoded.aud) {
            case "Admin":
                signature = env.ADMIN_SIGNATURE;
                audience ="Admin";
                break;
                case "User":
                    signature = env.USER_SIGNATURE;
                    audience = "User";
                    break;
        }
let accessToken = jwt.sign({id : decoded.id},signature,{
    expiresIn:"30m",
    // notBefore:"1m",
    // issuer:`${env.HOST}`,
    audience
})
return accessToken;
    }

export const decodedToken = (token,decoded)=>{

  
        let signature = undefined;
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