import { Router } from "express";
import { userservice } from "./user.service.js";
import { auth } from "../../middleware/auth.middleware.js";
import { SccuessResponse } from "../../common/exceptions/Scucess.respones.js";
import { uploadFile } from "../../common/utils/multer/cloud.js";
const router = Router();
router.get("/get-user-profile", auth, async (req, res) => {
    let userdata = await userservice.getUserprofile(req.userid);
    SccuessResponse({ res, message: "tmam", data: userdata });
});
router.patch("/update-profile", auth, uploadFile().single("file"), async (req, res) => {
    console.log(req.file);
    let userdata = await userservice.getUserprofile(req.userid);
    SccuessResponse({ res, message: "tmam", data: userdata });
});
export default router;
