import express from "express";
import type { Express,Request,Response } from "express";
import cors from "cors";
import  router  from "./modules/auth/auth.controller.js";
import {env} from "./config/env.service.js";
import { DbConnection } from "./database/connection.js";
import { redisService } from "./services/redis.service.js";
import userModel from "./database/model/user.model.js";
import {userRouter} from "./modules/index.js"
import { pipeline } from "stream";
import { promisify } from "util";
import { BadRequestException } from "./common/exceptions/application.exceptions.js";
import { s3service } from "./services/s3.service.js";
import { SccuessResponse } from "./common/exceptions/Scucess.respones.js";

const s3GetFile = promisify(pipeline)
export const Bootstrap = async()=>{

    const app:Express = express()
    app.use(cors(),express.json())
    await DbConnection()
    redisService.connect()


  app.get('/uploads/*path', async(req : Request,res : Response)=>
    {
        let {path} = req.params as {path : string[]}
        if(path.length == 0)
            {
                throw new BadRequestException("path is required")
            }
            let key = path.join("/")
            let {Body , ContentType} = await s3service.getAsset({key : key})
            s3GetFile(Body as NodeJS.ReadableStream , res)
            SccuessResponse({res,message:"user profile data",data: key})

    })



    app.use("/auth", router)
    app.use("/users",userRouter)
    app.listen(env.port,()=>
        {
            console.log(`server is running on port ${env.port}`);
            
        })


}