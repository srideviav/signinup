// const { SESClient, SendTemplateEmailCommand } = require("@aws-sdk/client-ses");
// require('dotenv').config();

// const SES_CONFIG = {
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//     },
//     region: process.env.AWS_SES_REGION
// };

// const SesClient = new SESClient(SES_CONFIG);

// const sendMail = async(templateName, recipientEmail) => {
//     const SendTemplateEmailCommand = new SendTemplateEmailCommand({
//         Destination: {
//             ToAddress: [
//                 recipientEmail
//             ]
//         },
//         Source: process.env.AWS_SES_SENDER,
//         Template: templateName,
//         TemplateData: JSON.stringify({ name: "theuser" })
//     });
// }
// sendMail("SES-Template", "srideviav456@gmail.com")