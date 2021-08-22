import request from "supertest"
import app from "../app";

test("test case for forget password",async()=>{
    await request(app).post("/account/reset-password/init")
    .send({email:"prakask@gmail.com"})
    .expect(200);
})

test("test case for reset password",async()=>{
    await request(app).post("/account/reset-password/finish")
    .send({key:"645634562",password:"test321"})
    .expect(200);
})

test("test case for change password",async()=>{
    await request(app).post("/account/change-password")
    .send({currentPassword:"test321",newPassword:"test@123"})
    .expect(200);
})