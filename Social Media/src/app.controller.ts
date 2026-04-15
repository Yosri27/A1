import express from "express";
import type { Express,Request,Response } from "express";
import cors from "cors";

export const Bootstrap = ()=>{

    const app:Express = express()
    app.use(cors(),express.json())
    app.listen("3000",()=>
        {
            console.log("server is running on port 3000");
            
        })


}