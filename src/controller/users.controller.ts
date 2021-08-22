import { Router, Request, Response } from "express"
const router = Router();
import { getRepository, Connection, getConnection } from "typeorm"
import User from "../entity/users"
import bcrypt from "bcrypt";
import sendActivationMailToNewUser from "../mail/mail";
import UserInformation from "../entity/user_info";
import Authority from "../entity/authority";
import { userDTO } from "../dto/userDTO";




/*
POST
To create user
*/
const createUser = async (req: Request, res: Response) => {
    try {

        let defaultPassword = Math.random() * 1000000*1000000;
        let userData = req.body;
        let hashPassword = await bcrypt.hash(String(defaultPassword), 10);
        userData.userDTO.password = hashPassword;
        userData.userDTO.resetKey = parseInt(String(defaultPassword));

        const { authorities, login, firstName, lastName, email, password, activated, resetKey, langKey, createdBy, lastModifiedBy } = userData.userDTO;
        const { phoneNumber, areas, status } = userData;

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.login = login;
        user.email = email;
        user.password = password;
        user.activated = activated;
        user.resetKey = resetKey;
        user.langKey = langKey;
        user.createdBy = createdBy;
        user.lastModifiedBy = lastModifiedBy;
        user.authorityName = `${authorities}`


        const userInfo = new UserInformation();
        userInfo.phoneNumber = phoneNumber;
        userInfo.areas = `${areas}`;
        userInfo.status = status;
        userInfo.userLogin = login;
        userInfo.userDTO = user;


        const checklogin = await getRepository(User).findOne({ login: login })
        if (checklogin) {
            return res.status(400).send({ "title": "Login name already used!", })
        }
        const checkEmail = await getRepository(User).findOne({ email: email })
        if (!checkEmail) {
            const result = await getRepository(User).save(user);
            const userInfoRel = await getRepository(UserInformation).save(userInfo)

            if (result && userInfoRel) {
               
                // sendActivationMailToNewUser(email,firstName,resetKey);
                return res.status(200).send({ msg: "user saved successfully" })

            }
            else {
                return res.status(401).send({ msg: "something went wrong" });
            }
        }
        else {
            if(checkEmail.activated)
            {
                return  res.status(401).send({ "title": "email already exists!", })
            }
            else{
                // sendActivationMailToNewUser(checkEmail.email,checkEmail.firstName,checkEmail.resetKey);
                return  res.status(401).send({ "title": "email already exists! activation link sent again!", })
            }
           
        }

    }
    catch (err) {
        console.log("mahesh", err)
        return res.status(401).send({"title":"something went wrong"})
    }
}

/*
GET 
To get users
*/
const getUsers = async (req: any, res: any) => {
    try {
        console.log(req.query)
        let users;
        const { size, sort, page } = req.query;
        if(sort)
        {
            const sortBy = sort.split(",");
            const By = sortBy[1].toUpperCase();
            users = await getRepository(UserInformation)
            .createQueryBuilder('userInfo')
            .innerJoinAndSelect("userInfo.userDTO", "user")
            .orderBy(`userInfo.${sortBy[0]}`, By || 'DESC' )
            .skip(page)
            .take(size)
            .getMany()
        }
        else{
            users = await getRepository(UserInformation)
            .createQueryBuilder('userInfo')
            .innerJoinAndSelect("userInfo.userDTO", "user")
            .getMany()
        }
        

        if (users) {
            return res.status(200).send(userDTO(users))
        }
        else {
            return res.status(200).send({ msg: "no records found" })
        }
    }
    catch (err) {
        throw err
    }
}

/*
PUT
To edit the user
*/
const updateUser = async (req: Request, res: Response) => {
    try {
        let userData = req.body;
        const { authorities, login, firstName, lastName, id } = userData.userDTO;
        const { phoneNumber, areas, status } = userData;
        let updateUser = await getConnection().query(`UPDATE users u JOIN user_information info ON u.id = info.userId 
                                                      SET u.firstName = "${firstName}",u.lastName = "${lastName}",u.login = "${login}",u.authorityName = "${authorities}", info.areas = "${areas}", info.phoneNumber = ${phoneNumber}, info.status = ${status}
                                                      where u.id = ${id}`);
      
        if (updateUser.changedRows != 0) {
            res.status(200).send({ msg: "user details are updated successfully" })
        } else {
            res.status(401).send({ title: "something went wrong" })
        }

    }
    catch (err) {
        return res.status(401).send({ title: "something went wrong" })
    }
}

/*
DELETE
to delete user
*/
const deleteUser = async (req: Request, res: Response) => {
    try {
        let user = await getRepository(User).delete({ login: req.params.login })
        if (user.affected != 0) {
            return res.status(200).send({ msg: "user deleted successfully" })
        }
        else {
            return res.status(401).send({ msg: "user not found" })
        }
    }
    catch (err) {
        throw err
    }
}


const test = async (req: Request, res: Response) => {
    let data = {
        msg: "test",
        code: "200"
    }
    return res.send(data)
}


router.post("/users", createUser);
router.put("/users", updateUser);
router.delete("/users/:login", deleteUser);
router.get("/users", getUsers);
router.get("/uu/test", test)

export default router;