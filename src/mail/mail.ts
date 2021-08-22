import transporter from "../config/mailTransport";

const sendActivationMailToNewUser = (email:string,name:string,resetKey:number)=>{
    let options = {
        form: "noreply@domain.com",
        to:email,
        subject:"Field Verification account activation",
        html:
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>
                <span>Dear</span><br/>
                <b>${name}</b>
            </p>
            <p>Your Field Verification account has been created, please click <a style="text-decoration: unset;"  href = "http://localhost:4200/reset/finish?key=${resetKey}">Here</a>  to activate your account.</p>
            <p>
                <span>Regards,</span><br/>
                Field Verification Team
            </p>
        </body>
        </html>`

    }

    transporter.sendMail(options,(err,info)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("mail has been sent")
        }
    })
}


const sendResetPasswordMail = (email:string,name:string,resetKey:number)=>{
    let options = {
        form: "noreply@domain.com",
        to:email,
        subject:"Field Verification account activation",
        html:
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>
                <span>Dear</span><br/>
                <b>${name}</b>
            </p>
            <p>please click <a style="text-decoration: unset;"  href = "http://localhost:4200/reset/finish?key=${resetKey}">Here</a> to reset your password.</p>
            <p>
                 <span>Regards,</span><br/>
                 Field Verification Team
            </p>
        </body>
        </html>`

    }

    transporter.sendMail(options,(err,info)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("mail has been sent")
        }
    })
}




export default  { sendActivationMailToNewUser ,sendResetPasswordMail} 