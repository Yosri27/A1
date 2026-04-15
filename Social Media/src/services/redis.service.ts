import { createClient,RedisClientType } from "redis";
import { env } from "../config/index.js"


export class RedisService
{
    private client: RedisClientType;
    constructor()
    {
        this.client = createClient({
            // url: env.RedisUri
        })
    }

    verifyemail()
    {
        
    }

}