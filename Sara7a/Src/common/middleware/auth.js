import { env } from "../../../Config/index.js";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../utils/response/error.response.js";
import {decodedToken} from './../index.js'
import { get } from "../../database/redis.service.js";


// const publicKey = fs.readFileSync("./public.key","utf-8");
// const privateKey = fs.readFileSync("./private.key","utf-8");


export const auth = async (req, res, next) =>
    {
        
        let decoded= jwt.decode(authorization);
        let signature = undefined;
         switch (decoded.aud) {
            case "Admin":
                    signature = env.adminSignature;
                break;
         
            default:
                signature = env.userSignature;
                break;
         }
         let decodedData = jwt.verify(authorization, publicKey, { algorithms: ["RS256"] });
      
         let revoked = await get(`revokeToken::${decodedData.id}::${req.token}`)
            console.log(revoked);
            
            if (revoked) {
                throw new Error("already logged out")
            }
                req.userId = decodedData.id;
                req.token = token
                req.decoded = data
            next();


    }


// export const auth = async (req, res, next) =>
//     {
        
//         let {authorization} = req.headers;
//         // console.log(decoded.id);
//         if(!authorization)
//             {
//                 throw UnauthorizedException({message:"Authorization header is required"})
//             }

//             let decoded = jwt.decode(authorization)
//             let decodedData = decodedToken(authorization,decoded)
//         if(!decoded)
//             {
//                 throw UnauthorizedException({message:"Invalid token"})
//             }
//             let revoked = await get(`revokeToken::${decodedData.id}::${req.token}`)
//             console.log(revoked);
            
//             if (revoked) {
//                 throw new Error("already logged out")
//             }
//         // console.log(decoded.id);
//         req.userId = decodedData.id;
//         next();
//     }