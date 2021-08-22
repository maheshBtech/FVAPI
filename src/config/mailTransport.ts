import { getMaxListeners } from "node:process";
import * as nodemailer from "nodemailer";

const accessKeyId = 'AKIARMTXFVDFTF4ANKBB';
const secretAccessKey = 'BGqlPG6/XEGIu07BNWn0YPz7GgXr21yoRMuz0HF0I8Qq';
const awsRegion = 'email-smtp.us-east-2.amazonaws.com';

const transporter = nodemailer.createTransport({
    // port: 465,
    // host: awsRegion,
    // secure: true,
    service:"gmail",
    auth: {
        user: "maheshbtech1999@gmail.com",
        pass: "XXXXXXXXXXX",
    },
    debug: true
})

export  default transporter;