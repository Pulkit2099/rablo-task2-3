const mongoose = require('mongoose');

const emailOtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
});

const EmailOtpModel = mongoose.model('EmailOTP', emailOtpSchema);

module.exports = EmailOtpModel;
