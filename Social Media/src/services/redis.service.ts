import { createClient,RedisClientType } from "redis";
import { env } from "../config/index.js"
import { string } from "zod";
import { BadRequestException } from "../common/exceptions/application.exceptions.js";


 class RedisService
{
    private client: RedisClientType;
    constructor()
    {
        this.client = createClient({
            url: env.Redis_URL
        })
        this.handelconnection()
    }
    handelconnection()
    {
        this.client.on("error",()=>
            {
                console.log("redis connection error");
                
            })
        this.client.on("ready",()=>
            {
                console.log("redis ready with no error");
            })

    }



  connect()
  {
    this.client.connect()
    console.log("redis connected");
    
  }

  CreateRevokeKey = ({userid, token}: {userid: string, token: string}) : string =>
  {
    const key = `revoketoken::${userid}::${token}`
    return key
  }

   set = async ({key , value , ttl} :{key: string, value: any, ttl?: number}) : Promise<string | null> =>
    {
     if (typeof value == "object") {
        value = JSON.stringify(value)
     }
    //  return await this.client.set(key,value, {EX: ttl})

     return await ( ttl? this.client.set(key,value, {EX: ttl}) : await this.client.set(key,value))
    }
 get = async (key : string) : Promise<string | null> => {
   let data = await this.client.get(key)
       try {
         data = JSON.parse(data!)
       } catch (error) {
        console.log(error);
        
       }
    
    return data
}    

 ttl = async (key: string) : Promise<number> =>
    {
        return await this.client.ttl(key)
    }

 exists = async (key: string) : Promise<number> =>
    {
        return await this.client.exists(key)
    }

 redis_delete = async (key : string): Promise<number>=>
    {
        return await this.client.del(key)
    }

 mget = async (...keys : string[]) : Promise<(string | null)[]> =>
    {
        return await this.client.mGet(keys)
    }
   keys = async (prefix : string) : Promise<string[]> => {
    return await this.client.keys(`${prefix}*`)
    
}

}





export const redisService = new RedisService()