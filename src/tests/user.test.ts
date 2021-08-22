import request from "supertest"
import app from "../app";

let testData = {

  "phoneNumber": "1234567890",
  "status": true,
  "areas": ["AP", "TS"],
  "userDTO": {
    "login": "userOne",
    "firstName": "maheswar",
    "lastName": "reddy",
    "email": "maheshbtech188@gmail.com",
    "activated": true,
    "langKey": "en",
    "createdBy": "mahesh",
    "lastModifiedBy": "mahesh",
    "authorities": ["ROLE_ADMIN"]
  }

}

let userData = {
  "phoneNumber": "9052625551",
  "areas": ["sainagar", "prakash nagar"],
  "status": true,
  "userDTO": {
    "authorities": ["ROLE_ADMIN"],
    "login": "userOne",
    "firstName": "ramesh",
    "lastName": "kumar",
    "id": "401"
  }
}


test("Insert User", async () => {
  await request(app).post("/api/users")
    .send(testData)
    .expect(200)
})


test("Should not insert with incomplete details", async () => {
  await request(app).post("/api/users")
    .send({ data: "incomplete data" })
    .expect(401)
})

test("Get users", async () => {
  await request(app).get("/api/user")
    .expect(200);
})

test("Update user",async()=>{
  await request(app).put("/api/users")
        .send({userData})
        .expect(200)
})

test("should not update with incomplete details",async()=>{
  await request(app).put("/api/users")
        .send({"userData":"data"})
        .expect(401)
})

test("Delete User",async()=>{
  await request(app).delete(`/api/users/:${testData.userDTO.login}`)
        .expect(200)
       
})