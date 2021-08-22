import { Router, Request, Response } from "express";
import { Any, createQueryBuilder, getConnection, getRepository } from "typeorm";
const router = Router();
import Cases from "../entity/cases";
import BV from "../entity/business_verification";
import RV from "../entity/residence_verification";
import Users from "../entity/users";
import { fieldCaseDTO,fieldCaseRestDTO } from "../dto/fieldCaseDTO";

/*
POST
To create case
*/

const createCase = async (req: Request, res: Response) => {
    try {
        let user, rel1, rel2, rel3;

        const { businessVerificationDTOs, fieldCaseDTO, residenceVerificationDTOs } = req.body;

        const BVCase = (bv: any) => {

            const newCase = new Cases();
            newCase.applicantName = fieldCaseDTO.applicantName;
            newCase.bankName = fieldCaseDTO.bankName;
            newCase.phone = fieldCaseDTO.phone;
            newCase.product = fieldCaseDTO.product;
            newCase.referenceNumber = fieldCaseDTO.referenceNumber;
            newCase.verificationType = fieldCaseDTO.verificationType;
            newCase.createdBy = fieldCaseDTO.createdBy,
                newCase.lastModifiedBy = fieldCaseDTO.lastModifiedBy;
            newCase.businessVerification = [bv]
            return newCase
        }
        const RVCase = (rv: any) => {

            const newCase = new Cases();
            newCase.applicantName = fieldCaseDTO.applicantName;
            newCase.bankName = fieldCaseDTO.bankName;
            newCase.phone = fieldCaseDTO.phone;
            newCase.product = fieldCaseDTO.product;
            newCase.referenceNumber = fieldCaseDTO.referenceNumber;
            newCase.verificationType = fieldCaseDTO.verificationType;
            newCase.createdBy = fieldCaseDTO.createdBy,
                newCase.lastModifiedBy = fieldCaseDTO.lastModifiedBy;
            newCase.residenceVerification = [rv]
            return newCase
        }

        const BOTHCases = (bv: any, rv: any) => {

            const newCase = new Cases();
            newCase.applicantName = fieldCaseDTO.applicantName;
            newCase.bankName = fieldCaseDTO.bankName;
            newCase.phone = fieldCaseDTO.phone;
            newCase.product = fieldCaseDTO.product;
            newCase.referenceNumber = fieldCaseDTO.referenceNumber;
            newCase.verificationType = fieldCaseDTO.verificationType;
            newCase.createdBy = fieldCaseDTO.createdBy,
                newCase.lastModifiedBy = fieldCaseDTO.lastModifiedBy;
            newCase.residenceVerification = [rv];
            newCase.businessVerification = [bv];
            return newCase
        }

        const newBV = (newUser: any) => {
            const bv = new BV()
            bv.address = businessVerificationDTOs[0].address;
            bv.area = businessVerificationDTOs[0].area;
            bv.caseStatus = businessVerificationDTOs[0].caseStatus;
            bv.name = businessVerificationDTOs[0].name;
            bv.users = newUser

            return bv
        }

        const newRV = (newUser: any) => {

            const rv = new RV();
            rv.address = residenceVerificationDTOs[0].address;
            rv.area = residenceVerificationDTOs[0].area;
            rv.caseStatus = residenceVerificationDTOs[0].caseStatus;
            rv.name = residenceVerificationDTOs[0].name;
            rv.users = newUser;

            return rv

        }

        if (fieldCaseDTO.verificationType === "BUSINESS") {
            user = await getRepository(Users).find({ login: businessVerificationDTOs[0].users[0].login });

            let new_BV = await newBV(user)
            let new_case = await BVCase(new_BV);


            rel1 = await getRepository(Cases).save(new_case);
        }
        else if (fieldCaseDTO.verificationType === "RESIDENCE") {

            user = await getRepository(Users).find({ login: residenceVerificationDTOs[0].users[0].login });

            let new_RV = await newRV(user)
            let new_case = await RVCase(new_RV);

            rel1 = await getRepository(Cases).save(new_case);
        } else {
            let BVuser = await getRepository(Users).find({ login: businessVerificationDTOs[0].users[0].login });
            let RVuser = await getRepository(Users).find({ login: residenceVerificationDTOs[0].users[0].login });

            let new_BV = newBV(BVuser);
            let new_RV = newRV(RVuser);
            let new_case = BOTHCases(new_BV, new_RV);

            // rel2 = await getRepository(RV).save(new_RV);
            // rel3 = await getRepository(BV).save(new_BV)
            rel1 = await getRepository(Cases).save(new_case);

        }


        if (rel1) {
            res.status(200).send({ title: "case is successfully created" })
        }
        else {
            res.status(500).send({ msg: "DB ERROR" })
        }



    }
    catch (err) {
        throw err;
    }
}

/*
PUT
To edit the business verification case
*/
const updateBV = async (req: Request, res: Response) => {
    try {
      
        const { id, address, name, since, addressMatch, personName, neighbourFeedback, remarks, caseStatus, area, rejectReason, finalStatus, applicantIncome,
            personDesignation, applicantQualification, otherApplicantQualification, applicantDesignation, otherApplicantDesignation, branchCount,
            buildingType, otherBuildingType, businessActivity, businessType, empId, empObserved, employmentType, headOffice, joiningDate, officeSetup,
            salaryCreditName, signBoard, otherSignBoard, totalEmp } = req.body;

        const rel = await getConnection()
            .createQueryBuilder()
            .update(BV)
            .set({
                address, name, since, addressMatch, personName, neighbourFeedback, remarks, caseStatus, area, rejectReason, finalStatus,
                applicantIncome, personDesignation, applicantQualification, otherApplicantQualification, applicantDesignation,
                otherApplicantDesignation, branchCount, buildingType, otherBuildingType, businessActivity, businessType, empId,
                empObserved, employmentType, headOffice, joiningDate, officeSetup, salaryCreditName, signBoard, otherSignBoard, totalEmp
            })
            .where("id  = :id", { id: id })
            .execute();
        if (rel) {
            res.status(200).send({ "msg": "Case is updated successfully" })
        }
    }
    catch (err) {
        throw err
    }
}


/*
PUT
To edit the residence verification case
*/
const updateRV = async (req: Request, res: Response) => {
    try {

        const { rejectReason, address, since, addressMatch, personName, owned, workDetails, housingType, floorCount, neighbourFeedback, locality, landMark, remarks, caseStatus, residenceType, area, relationship, earningMembers, totalMembers, applicantDob, finalStatus } = req.body

        const rel = await getConnection()
            .createQueryBuilder()
            .update(RV)
            .set({
                address, rejectReason, since, addressMatch, personName, owned, workDetails, housingType, floorCount, neighbourFeedback, locality, landMark, remarks, caseStatus, residenceType, area, relationship, earningMembers, totalMembers, applicantDob, finalStatus
            })
            .where("id  = :id", { id: req.body.id })
            .execute();
        if (rel) {
            res.status(200).send({ "msg": "Case is updated successfully" })
        }
        else {
            res.status(500).send({ "msg": "Internal server error" })
        }
    }
    catch (err) {
        throw err
    }
}


/*
PUT
To edit cases
*/
const updateCase = async (req: Request, res: Response) => {
    try {
        let query;
        const { residenceVerificationDTOs, businessVerificationDTOs, fieldCaseDTO } = req.body
        const { phone, bankName, referenceNumber, verificationType, applicantName, product } = fieldCaseDTO;

        if (verificationType === "BUSINESS") {

            const { name, area, address, id, users } = businessVerificationDTOs[0]
            query = await getConnection()
                .query(`UPDATE business_verification bv JOIN  cases c ON bv.fieldCaseId = c.id JOIN business_verification_user bvu ON bv.id = bvu.businessVerificationId 
        SET
        bvu.userId = ${users[0].id},bv.name = "${name}",bv.area = "${area}",bv.address = "${address}",c.phone = ${phone},referenceNumber = "${referenceNumber}",c.applicantName = "${applicantName}",c.product = "${product}", c.bankName = "${bankName}",c.verificationType = "${verificationType}"
        WHERE bv.id = ${id}`)

        } else if (verificationType === "RESIDENCE") {
            const { name, area, address, id, users } = residenceVerificationDTOs[0]
            query = await getConnection()
                .query(`UPDATE residence_verification rv JOIN  cases c ON rv.fieldCaseId = c.id JOIN residence_verification_user rvu ON rv.id = rvu.residenceVerificationId 
        SET
        rvu.userId = ${users[0].id},rv.name = "${name}",rv.area = "${area}",rv.address = "${address}",c.phone = ${phone},referenceNumber = "${referenceNumber}",c.applicantName = "${applicantName}",c.product = "${product}", c.bankName = "${bankName}",c.verificationType = "${verificationType}"
        WHERE rv.id = ${id}`)
        }

        if (query) {
            return res.status(200).send({ "msg": "Case is updated successfully" })
        }
        else {
            return res.status(500).send({ "title": "Internal server error" })
        }
    }
    catch (err) {
        throw err
    }
}

/*
GET
To get cases
*/
const getCases = async (req: any, res: Response) => {
    try {
        const { caseStatus, sort, size, page } = req.query;

        let filter = (`"` + caseStatus.split(",").join(`","`) + `"`)
        const sortWith = sort.split(",");
        const By = sortWith[1].toUpperCase()


        let cases = await getConnection().query(`select cases.* from cases WHERE cases.id IN (SELECT bv.fieldCaseId from business_verification bv where bv.caseStatus IN (${filter}))
                                           OR cases.id IN (SELECT rv.fieldCaseId from residence_verification rv where rv.caseStatus  IN (${filter}))`)


        if (cases) {
            let data: any = []
            if (cases.length != 0) {
                await Promise.all(cases.map(async (i: any) => {
                    data.push(await fieldCaseRestDTO(i))
                }))
                return res.status(200).send(data)
            }
            else {
                return res.status(200).send({ msg: "no records found" })
            }
        }
        else {
            return res.status(500).send({ title: "internal server error" })
        }
    }
    catch (err) {
        throw err
    }
}
/*
GET
*/
const getCaseByID = async (req: Request, res: Response) => {

    const cases = await getConnection()
        .createQueryBuilder(Cases, "cases")
        .where("cases.id = :id", { id: req.params.id })
        .getOne()

    if (cases) {
        let fieldCase = await fieldCaseRestDTO(cases)
        res.status(200).send(fieldCase)
    }
    else {
        res.status(500).send({ msg: "no case found" })
    }
}

/*
DELETE
to delete case
*/
const deleteCase = async (req: Request, res: Response) => {
    try {
        let user = await getRepository(Cases).delete(req.params.id)
        if (user.affected != 0) {
            return res.status(200).send({ msg: "Case is deleted successfully" })
        }
        else {
            return res.status(500).send({ msg: "case not found" })
        }
    }
    catch (err) {
        throw err
    }
}







router.post("/field-cases", createCase)
router.put("/business-verifications", updateBV)
router.put("/residence-verifications", updateRV)
router.put("/field-cases", updateCase)
router.get("/field-cases/:id", getCaseByID)
router.delete("/field-cases/:id", deleteCase)
router.get("/field-cases", getCases)

export default router