import type { NextFunction , Request , Response } from "express";
import {  ZodError, ZodType } from "zod";
import { BadRequestException } from "../common/exceptions/application.exceptions.js";
import { log } from "console";

type Validationkey = keyof Request
type ValidationSchema = Partial<Record<Validationkey,ZodType>>

export const Validation = (schema:ValidationSchema)=>
    {
        return ((req: Request,res: Response,next: NextFunction)=>{

            let ValidationError :{key:Validationkey,issue:ZodError["issues"]}[]=[]
            // console.log(ValidationError);
            
            for(const key of Object.keys(schema) as Validationkey[])
                {
                    if (!schema[key]) {
                        continue
                    }
                    const value = schema[key].safeParse(req[key])
                    // console.log(value);
                    
                    if (!value.success) {
                        ValidationError.push({key,issue:value.error.issues})
                    }
                }

                if (ValidationError.length > 0) {
                    // console.log(ValidationError);
                    
                    throw new BadRequestException("validaiton error",ValidationError)
                }

                next()


        })
    }