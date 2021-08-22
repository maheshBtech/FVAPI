import * as express from "express";
import userControllers from "./controller/users.controller";
import caseController from "./controller/cases.controller";
import loginController from "./controller/login.controller";
import dashbordController from "./controller/dashbord.controller";
import dataConfigController from "./controller/dataConfig.controllers";
import passwordController from "./controller/password.controller";
import uploadedCSV from "./controller/fileUpload.controller";
import pdfReportController from "./controller/pdfReportController";

export default (app:express.Router)=>{

    app.use("/api",userControllers,
                   caseController,
                   loginController,
                   dashbordController,
                   dataConfigController,
                   passwordController,
                   uploadedCSV,
                   pdfReportController
                   );
   
  
  
   
}
