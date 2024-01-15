const mongoose = require('mongoose');

const phoneOtpSchema = new mongoose.Schema({
  phone: String,
  otp: String,
});

const PhoneOtpModel = mongoose.model('PhoneOTP', phoneOtpSchema);

module.exports = PhoneOtpModel;
