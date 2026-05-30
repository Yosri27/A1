import mongoose from 'mongoose';
import { env } from '../config/env.service.js';


export const DbConnection = async () =>
    {
         mongoose.connect(env.mongourl).then(()=>
            {
                console.log(" mongo database connected");
                
            }).catch((err)=>
                {
                    console.log(err);
                    
                })
    }