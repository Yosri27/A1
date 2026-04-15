import { Router } from "express";
import { getUserById, login, signup } from "./auth.service.js";
import { SuccessResponse } from "../../common/utils/response/success.response.js";
import { authPlugins } from "mysql2";
import { auth } from "../../common/middleware/auth.js";
import { generateAccessToken } from "../../common/Security/security.js";
// import { multer_local } from "../../middleware/multer";
import joi from 'joi';
import { BadRequestException } from "../../common/index.js";
const router = Router();

// router.post('/profile-image',multer_local({}))

router.post("/signup", async (req, res) => {
   
   const signupSchema = joi.object({
      userName:  joi.string().min(3).max(100).required(),
      email:     joi.string().email().required(),
      Password:  joi.string.min(8).max(14).required().aphanumerical()
   })
   let {value , error} = signupSchema.validate(req.body)
   if (error) {
      throw BadRequestException({message:"validation error",extra:error})
   }
   let addeduser = await signup(req.body);
   SuccessResponse({res , message : "User added successfully" , status : 201 , data : addeduser})
})
   
   
   

router.get("/login", async (req, res) => {
   let loginuser = await login(req.body, `${req.protocol}://${req.host}`);
   SuccessResponse({res , message : "User logged in successfully" , status : 200 , data : loginuser})
})
router.put("/forgetPassword",(req, res)=>
   {

   })
router.post("/get-access-token", async (req, res) => {
   let accessToken = await generateAccessToken(req.headers.authorization);
   SuccessResponse({res , message : "Access token generated successfully" , status : 200 , data : { accessToken }})
})

router.get("/getUserById",auth, async (req, res) => {
   let user = await getUserById(req.userId);
   SuccessResponse({res , message : "User retrieved successfully" , status : 200 , data : user})
})   
export default router;