import request from "supertest"
import app from "../app";

test("authentication",async()=>{
    await request(app).post("/authenticate")
    .send({userNameOREmail:"praveen@gmail.com",password:"test123"})
    .expect(200)
})

test("Get accound details by token",async()=>{
    await request(app).get("/authenticate")
    .send({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjIxNDI2OTk4LCJleHAiOjE2MjE1MTMzOTh9.dT23EJGIld3fU7Q85KqKgy6e57xjFUoEzEv22NhO-bc"})
    .expect(200)
})