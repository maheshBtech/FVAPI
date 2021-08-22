import { Router } from "express";
import { getConnection } from "typeorm";
import { dashboardDTO } from "../dto/dashboardDTO";
const router = Router();

const dashbordStatus = async(req:any,res:any)=>{
  try{
    let bvStatus = await getConnection().query(`SELECT caseStatus,COUNT(*) count from business_verification GROUP BY caseStatus`)
    let rvStatus  =  await getConnection().query(`SELECT caseStatus,COUNT(*) count from residence_verification GROUP BY caseStatus`)
  
 
      let data = await dashboardDTO([...bvStatus , ...rvStatus])
      return res.status(201).send(data)
  }
  catch(err)
  {
    throw err
  }
}

router.get("/dashboard-metrics",dashbordStatus);

export default router;