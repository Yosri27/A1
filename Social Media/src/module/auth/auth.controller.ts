import { Router } from "express";
import type { Request,Response } from "express";
import authService from "./auth.service.js";
import { signupSchema } from "../../middleware/auth.validation.js";
import { BadRequestException } from "../../common/exceptions/application.exceptions.js";
 const router = Router()

router.post("/signup",async (req :Request,res:Response)=>
    {
        const data = authService.signup(req.body);
        console.log(data);
        let value = signupSchema.body.safeParse(req.body);
        if (!value.success)
            {
                throw new BadRequestException("error in validation", value.error)
            }

        
    })



router.post("/login",async (req :Request,res:Response)=>
    {
        const data = authService.login(req.body);
        console.log(data);
        
        
    })













 export default router;