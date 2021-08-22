import request from "supertest"
import app from "../app";

test(" test cases for creating dataConfigs ",async()=>{
    await request(app).post("/data-configs")
    .send({areas:["sainagar","prakashnagar"]})
    .expect(200)
 })

 test("test cases for updating",async()=>{
     await request(app).post("/data-configs/areas")
     .send({areas:["ram nagar"]})
     .expect(200)
 })