import {Router,Request,Response} from "express";
import { getConnection, getRepository } from "typeorm";
import DataConfig from "../entity/data_config";
import {DataConfigDTO} from "../dto/dataConfigDTO";
const router = Router();

/*
GET
to get areas
*/
const getDataConfig = async(req:Request,res:Response)=>{

    let area = await getRepository(DataConfig).findOne();
    if(area)
    {
        return res.status(200).send(DataConfigDTO(area))
    }
    else{
        return res.status(400).send({msg:"No areas are available"})
    }
}

/*
POST
to create areas
*/

const createArea = async(req:Request,res:Response)=>{

    const {areas} = req.body;
    let newArea = new DataConfig()
    newArea.area = `${areas}`;

    let result = await getRepository(DataConfig).save(newArea);

    if(result)
    {
        res.status(200).send({msg:"data saved successfully"})
    }
    else{
        res.status(500).send({msg:"internal server error"})
    }
}

/*
PUT
to update areas
*/

const updateArea = async(req:Request,res:Response)=>{

    const{areas} = req.body;
    let dataconfig = await getConnection()
                        .createQueryBuilder()
                        .update("data_config")
                        .set({
                            area:`${areas}`
                        })
                        .execute()
    if(dataconfig)
    {
        res.status(200).send({msg:"data updated successfully"})
    }
    else{
        res.status(500).send({msg:"internal server error"})
    }
}



router.get("/data-configs",getDataConfig);
router.post("/data-configs",createArea);
router.put("/data-configs/areas",updateArea)

export default router;