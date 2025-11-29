// utils/smsSender.js

// Generic SMS sending function
const sendSMS = (phone, message) => {
  // For now, just console.log the message to simulate sending
  console.log(`Sending SMS to ${phone}: "${message}"`);

  // Future integration with Twilio/Fast2SMS
  // if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
  //   const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  //   client.messages
  //     .create({
  //       body: message,
  //       from: process.env.TWILIO_PHONE_NUMBER,
  //       to: phone,
  //     })
  //     .then(message => console.log(`Twilio message sent: ${message.sid}`))
  //     .catch(error => console.error(`Twilio error: ${error.message}`));
  // } else if (process.env.FAST2SMS_API_KEY) {
  //   // Fast2SMS integration logic here
  // } else {
  //   console.log('SMS not sent: Twilio or Fast2SMS API keys not configured.');
  // }
};

// Specific function for attendance alerts
const sendAttendanceAlert = (student, status) => {
  let message;
  if (student.gender === 'Male') {
    message = `Dear Parent, your Son ${student.name} is ${status}.`;
  } else if (student.gender === 'Female') {
    message = `Dear Parent, your Daughter ${student.name} is ${status}.`;
  } else {
    message = `Dear Parent, your child ${student.name} is ${status}.`;
  }

  if (student.parentPhone) {
    sendSMS(student.parentPhone, message);
  } else {
    console.log(`No parent phone number found for ${student.name}, attendance SMS not sent.`);
  }
};

module.exports = {
  sendSMS,
  sendAttendanceAlert,
};

