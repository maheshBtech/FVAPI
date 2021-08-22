import request from "supertest"
import app from "../app";


test("dashboard test-case",async()=>{
   await request(app).get("/api/dashboard-metrics")
   .expect(201)
})