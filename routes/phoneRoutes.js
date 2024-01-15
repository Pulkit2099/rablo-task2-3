const express = require('express');
const router = express.Router();

const { generateOTP, sendOTPBySMS, storePhoneOTP, getStoredPhoneOTP } = require('../middleware/otpFunctions');

router.post('/send-otp', async (req, res) => {
  const otp = generateOTP();
  sendOTPBySMS(req.body.phone, otp);
  await storePhoneOTP(req.body.phone, otp);
  res.json({ message: 'OTP sent successfully' });
});

router.post('/verify-otp', async (req, res) => {
  const storedOTP = await getStoredPhoneOTP(req.body.phone);

  if (req.body.otp === storedOTP) {
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;
