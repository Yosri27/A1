import mongoose from 'mongoose';
import {env} from '../../../Config/env.service.js';

console.log(env.mongoURL);

    export const databaseConnection = async () => {
      
            await mongoose.connect(env.mongoURL).then(() => {
                console.log("Database Connected Successfully");
            }).catch((err) => {
                console.log("Database Connection Failed", err);
            });
       
     } 
    