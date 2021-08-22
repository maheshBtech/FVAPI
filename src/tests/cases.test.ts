import request from "supertest"
import app from "../app";

let caseTestData = {
        "businessVerificationDTOs":[
             {
                "address":"1-45 sai nagar",
                "area":"sainagar",
                "caseStatus":"ASSIGNED",
                "name":"Ysquare",
                "users":[
                    {
                        "login":"user2"
                    }
                ]
            }
        ],
        "fieldCaseDTO":{
            "applicantName":"project1",
            "bankName":"HDFC",
            "phone":1111,
            "product":"pppp",
            "referenceNumber":"b001",
            "verificationType":"BOTH",
            "createdBy": "Admin",
            "lastModifiedBy": "admin"
    
        },
        "residenceVerificationDTOs":[
            {
                "address":"1-45 sai nagar",
                "area":"sainagar",
                "caseStatus":"ASSIGNED",
                "name":"qsquare",
                "users":[
                    {
                        "login":"user2"
                    }
                ]
            }
        ]
}

let businessVerificationTestdata = {
    "businessVerificationDTOs":[
         {
            "address":"1-45 sai nagar",
            "area":"sainagar",
            "caseStatus":"ASSIGNED",
            "name":"Ysquare",
            "users":[
                {
                    "login":"user2"
                }
            ]
        }
    ],
    "fieldCaseDTO":{
        "applicantName":"project1",
        "bankName":"HDFC",
        "phone":1111,
        "product":"pppp",
        "referenceNumber":"b001",
        "verificationType":"BUSINESS",
        "createdBy": "Admin",
        "lastModifiedBy": "admin"

    },
    "residenceVerificationDTOs":[ ]
}

let residenceVerificationTestData = {
    "businessVerificationDTOs":[ ],
    "fieldCaseDTO":{
        "applicantName":"project1",
        "bankName":"HDFC",
        "phone":1111,
        "product":"pppp",
        "referenceNumber":"b001",
        "verificationType":"RESIDENCE",
        "createdBy": "Admin",
        "lastModifiedBy": "admin"

    },
    "residenceVerificationDTOs":[
        {
            "address":"1-45 sai nagar",
            "area":"sainagar",
            "caseStatus":"ASSIGNED",
            "name":"qsquare",
            "users":[
                {
                    "login":"user2"
                }
            ]
        }
    ]
}



test("Create case", async () => {
    await request(app).post("/api/field-cases")
      .send(caseTestData)
      .expect(200)
  })

test("should not create with incomplete data",async()=>{
    await request(app).post("/api/field-cases")
    .send({"caseTestData":"incompletedata"})
    .expect(401)
})

test("updateBusinessVerification",async()=>{
    await request(app).put("/business-verifications")
    .send(businessVerificationTestdata)
    .expect(200)
})

test("updateBesidenceVerification",async()=>{
    await request(app).put("/business-verifications")
    .send(residenceVerificationTestData)
    .expect(200)
})