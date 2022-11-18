const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-east-1" });
exports.handler = async function (event) {
  console.log('EVENT: ', event)
  const params = {
    Destination: {
      ToAddresses: ["your@email.com"],
    },
    Message: {
      Body: {
        Text: { 
            Data: `Hello from Lambda!` 
        },
      },
      Subject: { Data: `Message from AWS Lambda` },
    },
    Source: "nidhibaldia@email.com",
  };

  return ses.sendEmail(params).promise()
};
