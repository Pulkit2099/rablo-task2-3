const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const twilio = require('twilio');
const EmailOtpModel = require('../models/emailOtpModel');
const PhoneOtpModel = require('../models/phoneOtpModel');


// Twilio setup
const accountSid = 'AC680697533728ce6b05d960ebe5320a88';
const authToken = '124c428cb02ed1da2b69562d2a1073d0';
const twilioPhoneNumber = '+14156305838';
const twilioClient = twilio(accountSid, authToken);
// SMTP setup (as before)
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'annetta.bechtelar@ethereal.email',
    pass: 'WM6Qn4nvghZZgHVUf6',
  },
});

const generateOTP = () => randomstring.generate({ length: 6, charset: 'numeric' });

const sendOTPByEmail = (email, otp) => {
  const mailOptions = {
    from: 'smtp.ethereal.email',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const sendOTPBySMS = async (phone, otp) => {
  try {
    await twilioClient.messages.create({
      body: `Your OTP is: ${otp}`,
      from: twilioPhoneNumber,
      to: phone,
    });
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

const storeEmailOTP = async (email, otp) => {
  try {
    // const hashedOTP = await bcrypt.hash(otp, 10);
    await EmailOtpModel.create({ email, otp });
    console.log('Email OTP stored in the database');
  } catch (error) {
    console.error('Error storing Email OTP:', error);
  }
};

const storePhoneOTP = async (phone, otp) => {
  try {
    // const hashedOTP = await bcrypt.hash(otp, 10);
    await PhoneOtpModel.create({ phone, otp });
    console.log('Phone OTP stored in the database');
  } catch (error) {
    console.error('Error storing Phone OTP:', error);
  }
};

const getStoredEmailOTP = async (email) => {
  try {
    const result = await EmailOtpModel.findOne({ email });
    return result ? result.otp : null;
  } catch (error) {
    console.error('Error retrieving Email OTP:', error);
    return null;
  }
};

const getStoredPhoneOTP = async (phone) => {
  try {
    const result = await PhoneOtpModel.findOne({ phone });
    return result ? result.otp : null;
  } catch (error) {
    console.error('Error retrieving Phone OTP:', error);
    return null;
  }
};

module.exports = {
  generateOTP,
  sendOTPByEmail,
  sendOTPBySMS,
  storeEmailOTP,
  storePhoneOTP,
  getStoredEmailOTP,
  getStoredPhoneOTP,
};