import jwt from "jsonwebtoken";
import {Response,Request,NextFunction} from "express"
let secretCode = "ksadjfaskejfajsfela";

const validateToken = async(req:any,res:Response,next:NextFunction) =>{
    if(req.originalUrl === "/api/authenticate" || req.originalUrl === "/api/users"||req.originalUrl === "/api/account/reset-password/finish" || req.originalUrl === "/api/account/reset-password/init" || req.originalUrl === "/api/uu/test")
    {
        console.log(req.originalUrl)
        next()
    }
    else{
        console.log(req.originalUrl)
        const BrarerToken = req.headers['authorization'];
        const token =BrarerToken && BrarerToken.split(" ")[1];
        if(token == null) return res.sendStatus(401)
        jwt.verify(token,secretCode,(err:any,rel:any)=>{
            if(err) return res.sendStatus(403);
             req.user = rel;
             next();
        })
    }
}

export default validateToken;