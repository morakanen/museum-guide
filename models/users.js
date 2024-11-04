import db from "../db/db.js";

const getAllUsers = async() =>{
    const results  = await db 
    .select ("*")
    .from("Users")
    .orderBy([{column:"email",order:"asc"}]);
    console.log(results);
    return results;
};

export{getAllUsers};