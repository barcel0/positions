const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const sslRedirect = require('heroku-ssl-redirect');

//DB
const db = config.get('mongoURI');
mongoose.connect(process.env.MONGODB_URI || db, { useNewUrlParser: true, useUnifiedTopology: true, });

//CORS Fix. Goes BEFORE Routes
app.use(function (req, res, next) { //CORS fix
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);
  // Pass to next layer of middleware
  next();
});

//ROUTES
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
// const userRoutes = require('./routes/user');
const contractRoutes = require('./routes/contract');
const positionRoutes = require('./routes/position');

//CONFIG
app.use(express.json({ limit: '50mb', extended: true }));
app.use(sslRedirect());
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
app.use('/api/contract', contractRoutes);
app.use('/api/position', positionRoutes);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

//LISTENING
app.listen(port, () => console.log(`Listening on port ${port}...`));