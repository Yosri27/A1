import joi from "joi"

export const signupSchema =joi.object({
    username: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    age: joi.number().min(18).max(50).required(), 
    password : joi.string().min(6).max(18).required(),
    gender : joi. string().optional()  
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password : joi.string().min(6).max(18).alphanum().required()    
})
