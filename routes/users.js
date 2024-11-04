import express from "express";
import { getUsers } from "../controllers/users.js";

const router = express.Router();

/*default get reqeust path*/
router.get("/",(req,res) =>{
    getUsers(req,res);
});

export default router;