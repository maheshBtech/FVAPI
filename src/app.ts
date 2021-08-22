require("reflect-metadata");
require("dotenv").config({path:__dirname+'/.env'})
import express from "express";
const app = express();
import cors from "cors";
import  routes  from "./router";
import {createConnection} from "typeorm";
import validateAuthentication from "./middleware/authMiddleware";
import {sheduler} from "./controller/sheduler";


//allowing other origins for request and response
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//connection to database
createConnection()
.then(con=>console.log("database is connected"))
.catch(err=>console.log(err))

app.use(validateAuthentication)
// accessing routs
routes(app)
let shedule = sheduler

export default app