const session = require('express-session');
const MongoStore = require('connect-mongo');

const mongoose = require('mongoose');

module.exports = (app) => {
  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there

  app.set('trust proxy', 1);

  // use session
  app.use(
    session({
      secret: 'value',
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60000 * 10 // 60 * 1000 ms === 1 min
      },
      store: MongoStore.create({
        mongoUrl:
          process.env.MONGODB_URI ||
          process.env.DATABASE_URL ||
          'mongodb://127.0.0.1:27017/private-clinic'
      })
    })
  );
};
