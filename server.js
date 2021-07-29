const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoute = require('./routes/auth');
const credentialRoute = require('./routes/credentials');
// const shareRoute = require('./routes/share');
const protected = require('./jwtRouteTest');

// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook');

//Load config
dotenv.config({ path: 'config/config.env' });

//Connect DB
// connectDB();

const app = express();

//Middlewares
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/credentials', credentialRoute);
// app.use('/api/share', shareRoute);
app.use('/api/test', protected);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.CLIENT_ID_FB,
//       clientSecret: process.env.CLIENT_SECRET_FB,
//       callbackURL: 'http://localhost:5000/auth/facebook',
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get(
//   '/auth/facebook',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/login');
//   }
// );

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  )
);
