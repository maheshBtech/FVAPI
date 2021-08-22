

import { getConnection, getRepository } from "typeorm"
import BusinessVerification from "../entity/business_verification"
import ResidenceVerification from "../entity/residence_verification"
import { userAccountDTO } from "./userDTO"



export const fieldCaseDTO = (fieldCase: any,bv:any,rv:any) => {
    let data: any = {
   
            "fieldCaseDTO": {
                "id": fieldCase.id,
                "applicantName": fieldCase.applicantName,
                "bankName": fieldCase.bankName,
                "product": fieldCase.product,
                "referenceNumber": fieldCase.referenceNumber,
                "verificationType": fieldCase.verificationType,
                "phone": fieldCase.phone,
                "createdBy": fieldCase.createdBy,
                "lastModifiedBy": fieldCase.lastModifiedBy,
                "createdDate": fieldCase.createdDate,
                "lastModifiedDate": fieldCase.lastModifiedDate
            },
            "businessVerificationDTOs":bv?[{
                "id": bv.id,
                "address": bv.address,
                "applicantIncome":bv.applicantIncome,
                "personDesignation":bv.personDesignation,
                "otherPersonDesignation":bv.otherPersonDesignation,
                "applicantQualification":bv.applicantQualification,
                "otherApplicantQualification":bv.otherApplicantQualification,
                "applicantDesignation":bv.applicantDesignation,
                "otherApplicantDesignation":bv.otherApplicantDesignation,
                "branchCount":bv.branchCount,
                "buildingType":bv.buildingType,
                "otherBuildingType":bv.otherBuildingType,
                "businessActivity":bv.businessActivity,
                "businessType":bv.businessType,
                "otherBusinessType":bv.otherBusinessType,
                "empId":bv.empId,
                "empObserved":bv.empObserved,
                "employmentType":bv.employmentType,
                "headOffice":bv.headOffice,
                "joiningDate":bv.joiningDate,
                "officeSetup":bv.officeSetup,
                "name":bv.name,
                "addressMatch": bv.addressMatch,
                "personName": bv.personName,
                "remarks":bv.remarks,
                "salaryCreditName":bv.salaryCreditName,
                "neighbourFeedback": bv.neighbourFeedback,
                "signBoard":bv.signBoard,
                "otherSignBoard":bv.otherSignBoard,
                "since":bv.since,
                "totalEmp":bv.totalEmp,
                "createdBy": bv.createdBy,
                "createdDate": bv.createdDate,
                "lastModifiedBy": bv.lastModifiedBy,
                "lastModifiedDate": bv.lastModifiedDate,
                "caseStatus": bv.caseStatus,
                "area": bv.area,
                "rejectReason": bv.rejectReason,
                "finalStatus": bv.finalStatus,
                "fieldCaseId":bv.fieldCaseId,
                "users": [userAccountDTO(bv.users[0])]
            }]:[],
            "residenceVerificationDTOs":rv? 
             [{
                "id": rv.id,
                "address": rv.address,
                "name":rv.name,
                "since": rv.since,
                "addressMatch": rv.addressMatch,
                "personName": rv.personName,
                "relationship": rv.relationship,
                "applicantDob": rv.applicantDob,
                "owned": rv.owned,
                "totalMembers": rv.totalMembers,
                "earningMembers": rv.earningMembers,
                "workDetails": rv.workDetails,
                "housingType": rv.housingType,
                "floorCount": rv.floorCount,
                "neighbourFeedback": rv.neighbourFeedback,
                "locality": rv.locality,
                "landMark": rv.landMark,
                "remarks": rv.remarks,
                "createdBy": rv.createdBy,
                "createdDate": rv.createdDate,
                "lastModifiedBy": rv.lastModifiedBy,
                "lastModifiedDate": rv.lastModifiedDate,
                "caseStatus": rv.caseStatus,
                "residenceType": rv.residenceType,
                "area": rv.area,
                "rejectReason": rv.rejectReason,
                "finalStatus": rv.finalStatus,
                "fieldCaseId":rv.fieldCaseId,
                "users": [userAccountDTO(rv.users[0])]
            }]
            :[]
        }
   
    return data
}


export const fieldCaseRestDTO = async(caseData:any)=>{
    try{
        let bv = await getConnection()
                      .createQueryBuilder(BusinessVerification,"BV")
                      .innerJoinAndSelect("BV.users","user")
                      .where("BV.fieldCaseId = :fieldCaseId",{fieldCaseId:caseData.id})
                      .getOne()
        let rv = await getConnection()
                      .createQueryBuilder(ResidenceVerification,"RV")
                      .innerJoinAndSelect("RV.users","user")
                      .where("RV.fieldCaseId = :fieldCaseId",{fieldCaseId:caseData.id})
                      .getOne()
                      
return fieldCaseDTO(caseData,bv,rv)
     
    }
    catch(err)
    {
        throw err
    }
}
