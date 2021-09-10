const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
const credentialRoute = require('./routes/credentials');
const shareRoute = require('./routes/share');
const miscRoute = require('./routes/misc');
const convertRoute = require('./routes/convert');

//Load config
dotenv.config({ path: 'config/config.env' });

//Connect DB
connectDB();

const app = express();

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/auth/admin', adminRoute);
app.use('/api/auth/user', authRoute);
app.use('/api/auth/credentials', credentialRoute);
app.use('/api/auth/misc', miscRoute);
app.use('/api/share', shareRoute);
app.use('/api/convert', convertRoute);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  )
);
