import { Router, Request, Response } from "express";
import path from "path"
import fs from "fs"
import configReader from "csvtojson/v2"
import Cases from "../entity/cases";
import BV from "../entity/business_verification";
import RV from "../entity/residence_verification";
import Users from "../entity/users";
import { getRepository } from "typeorm";
const router = Router();
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../uploadedFiles`)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })


/*
POST
to create case with .CSV file
*/

const uploadedCSV = async (req: any, res: Response) => {
    try {
        const { filename } = req.file;
        let user, result: any;

        configReader()
            .fromFile(`${__dirname}/../uploadedFiles/${filename}`)
            .then(async (val) => {
            let saveCases = await Promise.all(val.map(async (data) => {

                const BVCase = (bv: any) => {
                    const newCase = new Cases();
                    newCase.applicantName = data.applicantName;
                    newCase.bankName = data.bankName;
                    newCase.phone = data.phone;
                    newCase.product = data.product;
                    newCase.referenceNumber = data.referenceNumber;
                    newCase.verificationType = data.verificationType;
                    newCase.createdBy = data.createdBy,
                    newCase.lastModifiedBy = data.lastModifiedBy;
                    newCase.businessVerification = [bv]
                    return newCase
                }
                const RVCase = (rv: any) => {

                    const newCase = new Cases();
                    newCase.applicantName = data.applicantName;
                    newCase.bankName = data.bankName;
                    newCase.phone = data.phone;
                    newCase.product = data.product;
                    newCase.referenceNumber = data.referenceNumber;
                    newCase.verificationType = data.verificationType;
                    newCase.createdBy = data.createdBy,
                    newCase.lastModifiedBy = data.lastModifiedBy;
                    newCase.residenceVerification = [rv]
                    return newCase
                }

                const BOTHCases = (bv: any, rv: any) => {

                    const newCase = new Cases();
                    newCase.applicantName = data.applicantName;
                    newCase.bankName = data.bankName;
                    newCase.phone = data.phone;
                    newCase.product = data.product;
                    newCase.referenceNumber = data.referenceNumber;
                    newCase.verificationType = data.verificationType;
                    newCase.createdBy = data.createdBy,
                    newCase.lastModifiedBy = data.lastModifiedBy;
                    newCase.residenceVerification = [rv];
                    newCase.businessVerification = [bv];
                    return newCase
                }

                const newBV = (newUser: any) => {
                    const bv = new BV()
                    bv.address = data.BV_address;
                    bv.area = data.BV_area;
                    bv.caseStatus = data.BV_caseStatus;
                    bv.name = data.BV_officeName;
                    bv.users = newUser

                    return bv
                }

                const newRV = (newUser: any) => {

                    const rv = new RV();
                    rv.address = data.RV_address;
                    rv.area = data.RV_area;
                    rv.caseStatus = data.RV_caseStatus;
                    rv.name = data.RV_officeName;
                    rv.users = newUser;

                    return rv

                }



                if (data.verificationType === "BUSINESS") {
                    user = await getRepository(Users).find({ login: data.BV_assignTo });

                    let new_BV = await newBV(user)
                    let new_case = await BVCase(new_BV);

                    result = await getRepository(Cases).save(new_case);
                }
                else if (data.verificationType === "RESIDENCE") {
                    user = await getRepository(Users).find({ login: data.RV_assignTo });

                    let new_RV = await newRV(user)
                    let new_case = await RVCase(new_RV);

                    result = await getRepository(Cases).save(new_case);
                }
                else if (data.verificationType === "BOTH") {
                    let BVuser = await getRepository(Users).find({ login: data.BV_assignTo });
                    let RVuser = await getRepository(Users).find({ login: data.RV_assignTo });

                    let new_BV = await newBV(BVuser);
                    let new_RV = await newRV(RVuser);
                    let new_case = await BOTHCases(new_BV, new_RV);


                    result = await getRepository(Cases).save(new_case);

                }

                // if (!result) {
                //     return res.status(500).send({ msg: "Internal server error" })
                // }

            })) 

                if (saveCases) {

                    fs.unlink(`${__dirname}/../uploadedFiles/${filename}`, (err) => {
                        if (err) {
                            console.log("file is not deleted", err)
                        }
                        else {
                            console.log("file deleted")
                        }
                    })
                        return res.status(200).send({ msg: "records are successfully stored" })
                  
                }
            })
    }
    catch (err) {
        throw err
    }
}


/*
GET
to downlode sample CSV file
*/
const downlodeSampleCSV = async(req:Request,res:Response)=>{
    try{
       let filePath = path.join(`${__dirname}/../sampleCSVfile/bulkStructure.csv`)
        res.sendFile(filePath)
    }
    catch(err)
    {
        throw err
    }
}

/*
POST
To upload RVfiles
*/
const uplodeRVFiles = async(req:Request,res:Response)=>{
    try{
        console.log(req.files)
        res.status(201).send({msg:"file uploaded successfully"})
    }
    catch(err)
    {
        throw err
    }
}

/*
POST
To upload BVfiles
*/
const uplodeBVFiles = async(req:Request,res:Response)=>{
    try{
        console.log(req.files)
        res.status(201).send({msg:"file uploaded successfully"})
    }
    catch(err)
    {
        throw err
    }
}




router.post("/field-cases/upload", upload.single("file"), uploadedCSV);
router.get("/downlode/sampleCSV",downlodeSampleCSV)
router.post("/residence-verifications/:id/verification-uploads",upload.array("files",10),uplodeRVFiles)
router.post("/business-verifications/:id/verification-uploads",upload.array("files",10),uplodeBVFiles)

export default router