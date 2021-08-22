import { Router,Request,Response } from "express";
import { getConnection, getRepository } from "typeorm";
import User from "../entity/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
const router = Router();
import {userAccountDTO} from "../dto/userDTO"

/*
POST
to check credentias and provide token
*/
const userLogin = async(req:Request,res:Response)=>{
    try{
        const {email,password,username} = req.body;
        const user = await getRepository(User).createQueryBuilder("user").select(["user.id","user.email","user.password","user.authorityName"]).where("user.email=:email",{email:username}).getOne();
       
        if(user)
        {
            const checkPassword = await bcrypt.compare(password,user.password)
            if(checkPassword)
            {
                let payload = {id:user.id}
                let secretCode = "ksadjfaskejfajsfela";
                let token = await jwt.sign(payload,secretCode,{expiresIn:"24h"});
                res.status(200).send({id_token:token})
            }
            else{
                res.status(401).send({msg:"Invalid login credentials"})
            }
        }
        else{
            res.status(401).send({msg:"Invalid login credentials"})
        }

    }
    catch(err)
    {
        throw err
    }
}

/*
GET
To get account details
*/
const getUserAccountByToken = async(req:any,res:Response)=>{
   try{
    let id = req.user.id;
    let user = await getRepository(User).findOne(id)
    if(user)
    {
        res.status(200).send(userAccountDTO(user));
    }
    else{
        res.status(401).send({msg:"user not found"})
    }
   }
   catch(err)
   {
       throw err
   }
}


router.post("/authenticate",userLogin);
router.get("/account",getUserAccountByToken);



export default router;