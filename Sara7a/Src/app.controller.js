import express from "express";
import { env } from './../Config/index.js';
import fs from 'node:fs'
import authRouter from "./modules/auth/auth.controller.js";
import { databaseConnection } from "./database/models/index.js";
import {client, connctRedis} from "./database/redis.js"
import { log } from "node:console";
import { get, set } from "./database/redis.service.js";


export const Bootstrap = async () => {
    const app = express();
    app.use(express.json());
    app.use("/auth", authRouter);
    // app.use(express.static('uploads'));
        await databaseConnection();
        await connctRedis();
    await client.set("name", "sara7a")
    // console.log(await client.get("name"));
    // await set({key:"test", value : {name: "sara7a", topic:"redis"},ttl : 60})
    // console.log(await get("test"));
    

app.use('{*dummy}', (req, res) => {
    res.status(404).json({ message: 'invalid route' });
    });  
    
    
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
    });
}