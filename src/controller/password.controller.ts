import {Router,Request,Response} from "express";
import { getConnection, getRepository } from "typeorm";
import {sendResetPasswordMail} from "../mail/mail"
import bcrypt from "bcrypt";
import Users from "../entity/users";
const router = Router();

const forgotPassword = async(req:Request,res:Response)=>{
   const{email} = req.body;
   const user = await getRepository(Users).findOne({email:email})
   if(user)
   {
       sendResetPasswordMail(user.email,user.firstName,user.resetKey);
       let updateActivateLink = await getRepository(Users)
                                      .createQueryBuilder()
                                      .update()
                                      .set({
                                          activated:false
                                      })
                                      .where("id = :id",{id: user.id})
                                      .execute()
         if(updateActivateLink)
         {
           return res.status(200).send({"msg":"reset password link have been sent successfully"})
         }                             
      
   }
   else
   {
       res.status(400).send({"msg":"Invalid email address"})
   }
}


/*
POST
to change password
*/

const resetPassword = async(req:any,res:any)=>{
    const {key ,newPassword} = req.body;

    const user = await getRepository(Users).findOne({resetKey:key})
    if(user)
    {
       
       if(user.activated === false)
       {
            let hashPassword = await bcrypt.hash(newPassword,10);
            let updatePassword = await getConnection()
                                      .query(`UPDATE users u JOIN user_information uf on u.id = uf.userId
                                      SET u.password = "${hashPassword}",u.activated = ${true},uf.status = ${true}
                                      where u.id = ${user.id}`)
                                  
            if(updatePassword)
            {
                return res.status(200).send({msg:"password updated successfully" })
            }
            else
            {
            return res.status(500).send({msg:"something went wrong"})
            }
       }
       else{
        res.status(400).send({msg:" Key was already used"})
       }
    }
    else
    {
        res.status(400).send({msg:"Incorrect Key was submitted"})
    }
}

const changePassword = async(req:any,res:Response)=>{
  try{
    const {id} = req.user;
    const {currentPassword,newPassword} = req.body;
    
    const user = await getRepository(Users)
                       .createQueryBuilder("user")
                       .select(["user.id","user.email","user.password"])
                       .where("user.id=:id",{id:id})
                       .getOne()

                      
    console.log(user)
    if(user)
    {
        let checkPassword = await bcrypt.compare(currentPassword,user.password)
        if(checkPassword)
        {
              let hashPassword = await bcrypt.hash(newPassword,10);

              let updatePassword = await getRepository(Users)
                                            .createQueryBuilder()
                                            .select()
                                            .update()
                                            .set({
                                                password:hashPassword
                                            })
                                            .where("id = :id",{id: user.id})
                                            .execute()
              if(updatePassword)
              {
                return res.status(200).send({msg:"password updated successfully"})
              }
              else{
                  return res.status(500).send({msg:"internal server error"})
              }
        }
        else{
           return  res.status(401).send({msg:"You have entered Incorrect Password. Please try again"})
        }
    }
    else{
        return res.status(401).send({msg:"user not found"})
    }
  }
  catch(err)
  {
      throw err
  }
}


router.post("/account/reset-password/init",forgotPassword)
router.post("/account/reset-password/finish",resetPassword);
router.post("/account/change-password",changePassword)
export default router;