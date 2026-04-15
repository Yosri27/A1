import dotenv from 'dotenv';
dotenv.config({path:"./.env"});
// const mongoURL = process.env.MONGO_URI;
// const port = process.env.PORT;
// const mood = process.env.MOOD;
// const salt = process.env.SALT;
// const JWT_KEY = process.env.JWT_KEY;
const RedisUri = process.env.redisUri
// const ADMIN_SIGNATURE = process.env.JWT_ADMIN_SIGNATURE;
// const USER_SIGNATURE = process.env.JWT_USER_SIGNATURE;
export const env ={RedisUri};