import { createClient } from "redis"
import {env} from "../../Config/index.js"
export const client = createClient({
  url: env.REDIS_URI
});

client.on("error", function(err) {
  throw err;
});

export const connctRedis = async ()=>
    {
        try {
            await client.connect();
        console.log("redis connected");
        } catch (error) {
            console.log(error);
            
        }
        
    }
