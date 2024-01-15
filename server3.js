

const express = require('express');
const mongoose = require('mongoose');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const bodyParser=require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;

// Mongoose setup (as shown in previous steps)

mongoose.connect('mongodb+srv://pulkit:123@cluster0.xofh23l.mongodb.net/otp-database?retryWrites=true', );

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});



  

app.use(bodyParser.json());

// Import route files
const emailRoutes = require('./routes/emailRoutes');
const phoneRoutes = require('./routes/phoneRoutes');

// Use route files
app.use('/email', emailRoutes);
app.use('/phone', phoneRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});












