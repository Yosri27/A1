import type { NextFunction } from "express";
import { object, ZodError, ZodType } from "zod";
import { BadRequestException } from "./application.exception.js";

type Validationkey = keyof Request
type ValidationSchema = Partial<Record<Validationkey,ZodType>>

export const Validation = (schema:ValidationSchema)=>
    {
        return ((req: Request,res: Response,next: NextFunction)=>{

            let ValidationError :{key:Validationkey,issue:ZodError["issues"]}[]=[]
            for(const key of Object.keys(schema) as Validationkey[])
                {
                    if (!schema[key]) {
                        continue
                    }
                    const value = schema[key].safeParse(req[key])
                    if (!value.success) {
                        ValidationError.push({key,issue:value.error.issues})
                    }
                }

                if (ValidationError.length > 0) {
                    throw new BadRequestException("validaiton error",ValidationError)
                }

                next()


        })
    }