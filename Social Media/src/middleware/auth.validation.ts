import {z} from "zod"

export const signupSchema = {
    body: z.strictObject({
        name:z.string({error:"name not found"}).min(2).max(20),
        email:z.email({error:"invalid email"}),
        password:z.string({error:"password not found"}).min(6).max(20),
        confirmPassword:z.string({error:"no match"}).min(6).max(20)
    }).superRefine((data, ctx)=>{

        if (data.password !== data.confirmPassword) {
            ctx.addIssue({code :"custom",message:"password dont match"})
        }
    })

}