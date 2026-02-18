import { Router } from "express";
import { addLog } from "./logs.service.js";
const router = Router();


router.post('/add-log', async (req, res) =>
    {
        
        let {message} = req.body;
        let data = await addLog(message);
        res.json({message: "Done", data : data});
    })










export default router;