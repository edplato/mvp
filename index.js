const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const config = require('./config/db');

// DATABASE ON
const mongoose = require('mongoose');
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('CONNECTED TO MONGODB');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

const app = express();
const apiRouter = require('./routes/apiroutes.js');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 180 * 60 * 1000 }
}));

app.use(cors());

app.use('/api', apiRouter);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

// SET PORT AND START SERVER
var port = process.env.PORT || 3000;

app.listen(port);
console.log('SERVER STARTED ON PORT ' + port);