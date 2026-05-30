import { Router } from "express";
import authService from "./auth.service.js";
import { signupSchema } from "../../middleware/auth.validation.js";
import { Validation } from "../../middleware/validation.middleware.js";
import { SccuessResponse } from "../../common/exceptions/Scucess.respones.js";
import { auth } from "../../middleware/auth.middleware.js";
const router = Router();
router.post("/signup", Validation(signupSchema), async (req, res) => {
    const data = await authService.signup(req.body);
    res.json(SccuessResponse({ res, message: "user created", data: data }));
});
router.post("/login", async (req, res) => {
    const data = await authService.login(req.body);
    return SccuessResponse({ res, message: "login success", data });
});
router.put("/verify-email", async (req, res) => {
    const data = await authService.verifyEmail(req.body);
    SccuessResponse({ res, message: "Email verified successfully", data: data });
});
router.get("/test", auth, async (req, res) => {
    res.json(SccuessResponse({ res, message: "test", }));
});
export default router;
// console.log(data);
// let value = signupSchema.body.safeParse(req.body);
// console.log(value);
// if (!value.success)
//     {
//         throw new BadRequestException("error in validation", value.error)
//     }
// else
