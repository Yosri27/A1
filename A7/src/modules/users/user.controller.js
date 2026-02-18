import { Router } from "express";
const router = Router();
import { userModel } from './../../database/models/user.model.js';
import { getAllUsers } from "./user.service.js";
router.get('/get-all-users', async (req, res) => {
  

    let userData = await getAllUsers();
    res.json({message: "All users data", data: userData});

});








export default router;