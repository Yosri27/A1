import { Router } from "express";
import { borrow } from "./bb.service.js";
const router = Router();

router.get('/get', async (req,res)=>
    {
        let userdata = await borrow(req.body)

    } )











export default router;