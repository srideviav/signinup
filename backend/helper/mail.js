const nodemailer = require("nodemailer");

const sendEmail = (email, subject, text) => {
    console.log(process.env.EMAIL, process.env.PASSWORD)
    const transporter = nodemailer.createTransport({
        // sendmail: true,
        // newline: 'windows',
        // logger: false
        // host: process.env.EMAIL_HOST,
        service: 'gmail',
        // //port: process.env.EMAIL_PORT,
        // port: 587, // You can also try 465 for SSL
        // secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
            minVersion: "TLSv1.2"
        }
    });
    transporter.sendMail({
        from: process.env.EMAIL,
        to: "sridevi@gmail.com",
        subject: "subject",
        text: "text",
    }).then(mail => {
        if (mail) {
            console.log("mail sent successfully:", mail)
        } else {
            console.log("mail not sent")
        }
    }).catch(err => {
        console.log("Something Went Wrong:", err)
    })
};

module.exports = sendEmail;