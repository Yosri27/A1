import { Request, Response, Router } from "express";
import { userservice } from "./user.service.js";
import { auth } from "../../middleware/auth.middleware.js";
import { SccuessResponse } from "../../common/exceptions/Scucess.respones.js";
import { uploadFile } from "../../common/utils/multer/cloud.js";
import { MulterEnum } from "../../enums/multer.enums.js";

const router = Router()


router.get("/get-user-profile",auth ,async(req : Request, res:Response)=>
    {
        let userdata = await userservice.getUserprofile(req.userid as string)
         SccuessResponse({res,message:"tmam",data: userdata})
    })

router.patch("/update-profile",auth ,uploadFile({storagekey: MulterEnum.diskStorage}).single("file"),async(req : Request, res:Response)=>
    {
        console.log(req.file);
        
        let userdata = await userservice.updateUserprofile(req.userid as string, req.file as Express.Multer.File)
         SccuessResponse({res,message:"tmam",data: userdata})
    })    


router.patch("/update-cover-pic",auth ,uploadFile({storagekey: MulterEnum.diskStorage}).array("files"),async(req : Request, res:Response)=>
    {
        console.log(req.file);
        
        let userdata = await userservice.updateCoverPic(req.userid as string, req.files as Express.Multer.File[])
         SccuessResponse({res,message:"tmam",data: userdata})
    })        

export default router