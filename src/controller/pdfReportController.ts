import { Router, Request, Response } from "express";
import { RVreport, BVreport } from "../sampleCSVfile/html"
import fs from "fs"
import pdf from "html-pdf"
const router = Router();
import path from "path";
import { getConnection } from "typeorm";
import Cases from "../entity/cases";
import { fieldCaseRestDTO } from "../dto/fieldCaseDTO"

const createPDF = async (req: Request, res: Response) => {
    try {

        const { fieldCaseId, rvId, bvId } = req.params;
        let getCase = await getConnection()
                .createQueryBuilder(Cases, "cases")
                .where("cases.id = :id", { id: fieldCaseId })
                .getOne()

        let data = await fieldCaseRestDTO(getCase)

        if (parseInt(rvId)) {
          
            let html = RVreport(data)
            pdf.create(html, { format: "A4" }).toFile(`${__dirname}/../sampleCSVfile/pdf-report.pdf`, (err, rel) => {
                if (err) {
                    throw err;
                }
                else {
                  return res.sendFile(path.join(`${__dirname}/../sampleCSVfile/pdf-report.pdf`))
                }
            })
        }
        else if(parseInt(bvId)) {
            let html = BVreport(data)
            pdf.create(html, { format: "A4" }).toFile(`${__dirname}/../sampleCSVfile/pdfName.pdf`, (err, rel) => {
                if (err) {
                    throw err;
                }
                else {
                  return res.sendFile(path.join(`${__dirname}/../sampleCSVfile/pdfName.pdf`))
                }
            })
        }

    }
    catch (err) {
        throw err
    }
}


router.get("/pdf-report/:fieldCaseId/:rvId/:bvId", createPDF)
export default router