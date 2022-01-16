const url = 'https://api.sendinblue.com/v3/smtp/email';
const axios = require('axios');


const sendEmail = async () => {
  const response = axios({
    method: 'POST',
    url,
    headers: {
      'api-key': process.env.
    },
    data: {
      sender: 'maxim@test.com',
      to: [{email: 'maximlucov@gmail.com', name: 'Maxim'}],
      subject: 'This is subject',
      htmlContent: 'this is the content',
      // attachment: [{
      //   content: 'File64', name: 'File64',
      // }]
    }
  }).catch((err) => {
    console.log(err);
  });
  console.log(response)
}

module.exports = sendEmail;
