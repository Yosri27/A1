import { NextFunction, Request, Response } from "express";
import { env } from "../config/index.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BadRequestException } from "../common/exceptions/application.exceptions.js";
import { TokenService } from "../services/token.service.js";
import { redisService } from "../services/redis.service.js";
import { string } from "zod/v3";

const tokenservice = new TokenService

// interface authinterface extends Request
// {
//     userid?: string,
//     token?: string | undefined,
//     deocded?: JwtPayload
// }

declare global {
    namespace Express
    {
        interface Request
        {
        userid?: string,
        token?: string,
        deocded?: JwtPayload
        }
    }
}

export const auth = async (req : Request, res:Response, next:NextFunction) =>
    {
            let {authorization} = req.headers;
            if(!authorization)
                {
                    throw new BadRequestException("Authorization header is required")
                }
                let [flag ,token]= authorization.split(" ")
                
                // console.log(authorization);
                if (!flag || !token) {
                    throw new BadRequestException("Authorization header is required")
                }
                switch (flag) {
                    case "Basic":
                            const Basicdata = Buffer.from(token,"base64").toString()
                            let [email , password] = Basicdata.split(":")
                            console.log(email, " ",password);
                            break;
                    case "Bearer":
                            if (!authorization) {
                                throw new BadRequestException("un authorized")
                            }
                            let data = tokenservice.decodedToken(token) as JwtPayload
                            let revoked = await redisService.get(redisService.CreateRevokeKey({
                                userid: data.id,
                                token
                            }))
                            if (revoked !== null ){
                                throw new BadRequestException("already logout")
                            }

                            req.userid = data.id
                            req.token = token
                            req.deocded = data
                        next();
                        break;

                            
                    // default:
                    //     break;
                }
              
            }
    
    
        // {
            
        //     let decoded= jwt.decode(authorization);
        //     let signature = undefined;
        //      switch (decoded.aud) {
        //         case "Admin":
        //                 signature = env.adminSignature;
        //             break;
             
        //         default:
        //             signature = env.userSignature;
        //             break;
        //      }
        //      let decodedData = jwt.verify(authorization, publicKey, { algorithms: ["RS256"] });
          
        //      let revoked = await get(`revokeToken::${decodedData.id}::${req.token}`)
        //         console.log(revoked);
                
        //         if (revoked) {
        //             throw new Error("already logged out")
        //         }
        //             req.userId = decodedData.id;
        //             req.token = token
        //             req.decoded = data
        //         next();
    
    
        // }