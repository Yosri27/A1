import  Express  from "express";
import type {Request,Response} from "express"
const router = Express.Router()
import {AuthService} from "./auth.service.js";
const authsevcice = new AuthService()


router.post("/signup", async(req:Request,res:Response)=>
    {
        let data = await authsevcice.signup(req.body)
        res.status(200).json({message:"user created",data})   
    })


router.post("/login", async(req:Request,res:Response)=>
    {
        let data = await authsevcice.login(req.body)
        if(data)
        {
            res.status(200).json({message:"login done",data})   
        }
        else
        {
            res.status(300).json({message:"invalid"})   
        }  
    })

router.delete("/delete", async(req:Request,res:Response)=>
    {
        let data = await authsevcice.delete(req.body)
        if (data)
        {
            res.status(200).json({message:"user deleted"})   
        }
        else
        {
            res.status(300).json({message:"failed"})   
        }
    })

router.patch("/update",async(req:Request, res:Response)=>
    {
        let data = await authsevcice.delete(req.body)
    })

export default router