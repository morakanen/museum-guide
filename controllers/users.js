import { getAllUsers } from "../models/users.js";
async function getUsers(req,res){
    try{
        const results = await getAllUsers()
            return res.status(200).json(results);
    }catch (error){
        console.log(error);
        return res.status(500).json(error);
    }
}

export {getUsers};