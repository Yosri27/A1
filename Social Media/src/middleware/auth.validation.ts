import {z} from "zod"

export const signupSchema = {
    body: z.object({
        userName:z.string({error:"name not found"}).min(2).max(20),
        email:z.string().email({error:"invalid email"}),
        password:z.string({error:"password not found"}),
        phone : z.string({ error : "phone not found"}).min(12).max(50),
        confirmPassword : z.string({error:"confirm password not found"})
    }).superRefine((data, ctx)=>{

        if (data.password !== data.confirmPassword) {
            console.log(data);
            
            ctx.addIssue({code :"custom",message:"password dont match"})
        }
    })

}

export const loginSchema = 
{
    body: z.strictObject({
        email:z.email({error:"invalid email"}),
        password:z.string({error:"password not found"}).min(6).max(20)

    })

}