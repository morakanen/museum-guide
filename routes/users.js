import express from "express";
import { getUsers,createUser,removeUser,getUser,Museumapi, loginUser,sendemail} from "../controllers/users.js";



const router = express.Router();


/*default get reqeust path*/
router.get("/",(req,res) =>{
    getUsers(req,res);
});

router.post('/newsletter-signup',sendemail)
router.post('/login',loginUser);
router.delete('/users/id:', removeUser);
router.get('/users/:id', getUser);
router.post('/users/register', createUser);
router.get('/museumapi',Museumapi)





export default router;