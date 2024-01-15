const express = require('express');
const router = express.Router();

const { generateOTP, sendOTPByEmail, storeEmailOTP, getStoredEmailOTP } = require('../middleware/otpFunctions');

router.post('/send-otp', async (req, res) => {
  const otp = generateOTP();
  sendOTPByEmail(req.body.email, otp);
  await storeEmailOTP(req.body.email, otp);
  res.json({ message: 'OTP sent successfully' });
});

router.post('/verify-otp', async (req, res) => {
  const storedOTP = await getStoredEmailOTP(req.body.email);

  if (req.body.otp === storedOTP) {
    res.json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;
