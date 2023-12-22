// const AWS = require('aws-sdk');

// const SES_CONFIG = {
//     accessKeyId: process.env.AWS_ACCESS_KEY || "access key",
//     secretAccessKey: process.env.AWS_SECRET_KEY || "secret key",
//     region: process.env.AWS_REGION || "region"
// }
// const AWS_SES = new AWS.SES(SES_CONFIG);


// const Send = async(toEmail, name) => {
//     let params = {
//         Source: process.env.AWS_SENDER_EMAIL || "srideviav456@gmail.com",
//         Destination: {
//             ToAddresses: [
//                 toEmail
//             ]
//         },
//         ReplyToAddresses: [],
//         Message: {
//             Body: {
//                 Text: {
//                     Data: "This is the Password Recovery Email"
//                 }
//             },
//             Subject: {
//                 Data: `Hello ${name}! name`
//             }
//         }
//     }
//     try {
//         const res = await AWS_SES.sendEmail(params).promise();
//         console.log("Email Sent:", res)
//     } catch (error) {
//         console.log(error)
//     }
// }


// Send("srideviav456@gmail.com", "sridevi")