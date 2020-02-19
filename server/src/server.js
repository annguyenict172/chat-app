const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

app = express();

// Middleware
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Add on
app.use((req, res, next) => {
  res.jsonError = (error) => {
    return res.status(error.httpStatusCode).json(error);
  };
  next();
});

// Routes
app.use('/api', routes);

// Connect to DB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'
mongoose.connect(mongoURI)
  .then(() => {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })