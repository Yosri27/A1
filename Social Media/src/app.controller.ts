import express from "express";
import type { Express,Request,Response } from "express";
import cors from "cors";
import  router  from "./modules/auth/auth.controller.js";
import {env} from "./config/env.service.js";
import { DbConnection } from "./database/connection.js";
import { redisService } from "./services/redis.service.js";
import userModel from "./database/model/user.model.js";
import {userRouter} from "./modules/index.js"


export const Bootstrap = async()=>{

    const app:Express = express()
    app.use(cors(),express.json())
    await DbConnection()
    redisService.connect()


  



    app.use("/auth", router)
    app.use("/users",userRouter)
    app.listen(env.port,()=>
        {
            console.log(`server is running on port ${env.port}`);
            
        })


}