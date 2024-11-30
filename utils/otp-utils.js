// utils/otp-utils.js

// Generate a random 6-digit OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  function sendSmsOtp(phone, otp) {
    // Implement your SMS sending logic, e.g., using Twilio
    // Example:
    const accountSid = 'your_twilio_account_sid';
    const authToken = 'your_twilio_auth_token';
    const client = require('twilio')(accountSid, authToken);
  
    client.messages.create({
      body: `Your OTP code is: ${otp}`,
      to: phone,
      from: 'your_twilio_phone_number'
    }).then(message => console.log(message.sid)).catch(err => console.log(err));
  }
  
  function sendEmailOtp(email, otp) {
    // Implement your email sending logic
    const transporter = require('nodemailer').createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
  
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  
  module.exports = { generateOtp, sendSmsOtp, sendEmailOtp };
  