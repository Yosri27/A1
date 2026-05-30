import { createClient } from "redis";
import { env } from "../config/index.js";
class RedisService {
    client;
    constructor() {
        this.client = createClient({
            url: env.Redis_URL
        });
        this.handelconnection();
    }
    handelconnection() {
        this.client.on("error", () => {
            console.log("redis connection error");
        });
        this.client.on("ready", () => {
            console.log("redis ready with no error");
        });
    }
    connect() {
        this.client.connect();
        console.log("redis connected");
    }
    CreateRevokeKey = ({ userid, token }) => {
        const key = `revoketoken::${userid}::${token}`;
        return key;
    };
    set = async ({ key, value, ttl }) => {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        //  return await this.client.set(key,value, {EX: ttl})
        return await (ttl ? this.client.set(key, value, { EX: ttl }) : await this.client.set(key, value));
    };
    get = async (key) => {
        let data = await this.client.get(key);
        try {
            data = JSON.parse(data);
        }
        catch (error) {
            console.log(error);
        }
        return data;
    };
    ttl = async (key) => {
        return await this.client.ttl(key);
    };
    exists = async (key) => {
        return await this.client.exists(key);
    };
    redis_delete = async (key) => {
        return await this.client.del(key);
    };
    mget = async (...keys) => {
        return await this.client.mGet(keys);
    };
    keys = async (prefix) => {
        return await this.client.keys(`${prefix}*`);
    };
}
export const redisService = new RedisService();
