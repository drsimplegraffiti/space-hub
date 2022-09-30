// send sms to host

const axios = require('axios');

const sendSms = async (name, mobiles, access_code) => {
  const message = `Hi ${name}, your access note is ${access_code}`;

  let username = process.env.SMS_USERNAME;
  let password = process.env.SMS_PASSWORD;
  let sender = process.env.SMS_SENDER;
  let url = `https://account.kudisms.net/api/?`;

  let data = `username=${username}&password=${password}&sender=${sender}&mobiles=${mobiles}&message=${message}`;

  try {
    const response = await axios.post(url, data);
    console.log(response.data);
    console.log('sms sent');
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendSms;

