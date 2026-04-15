import { env } from "../../../Config/index.js";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../utils/response/error.response.js";
import {decodedToken} from './../index.js'


// const publicKey = fs.readFileSync("./public.key","utf-8");
// // const privateKey = fs.readFileSync("./private.key","utf-8");


// export const auth = (req, res, next) =>
//     {
//         let authorization = req.headers;
//         if (!authorization) {
//             UnauthorizedException({ message: "Authorization header is required" });
//         }
//         let decoded= jwt.decode(authorization);
//         let signature = undefined;
//          switch (decoded.aud) {
//             case "Admin":
//                     signature = env.adminSignature;
//                 break;
         
//             default:
//                 signature = env.userSignature;
//                 break;
//          }
//          let decodedData = jwt.verify(authorization, publicKey, { algorithms: ["RS256"] });
//          req.userId = decodedData.id;
//             next();


//     }


export const auth = (req, res, next) =>
    {
        
        let {authorization} = req.headers;
        // console.log(decoded.id);
        if(!authorization)
            {
                throw UnauthorizedException({message:"Authorization header is required"})
            }

            let decoded = jwt.decode(authorization)
            let decodedData = decodedToken(authorization,decoded)
        // if(!decoded)
        //     {
        //         throw UnauthorizedException({message:"Invalid token"})
        //     }
        // console.log(decoded.id);
        req.userId = decodedData.id;
        next();
    }