import { Router } from "express";
import { addUser, LogUser} from "./user.service.js";
const router = Router();

router.post('/signup', async (req ,res)=>
    {
       let userData = await addUser(req.body);
       if(userData)
        {
            res.json({message: "User added successfully", userData});
        }
        else
        {
            res.json({message: "Error"});
        }
       

    } );
router.post('/login',async(req,res)=>
    {
        let userData = await LogUser(req.body)
        if (userData)
        {
              res.json({message: "User exist"});
        }
        else
            {
                res.json({message: "User  not exist"});
            }
    } )







export default router;