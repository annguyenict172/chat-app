const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const chatService = require('./libs/chatService');
const routes = require('./routes');

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

// Init chat service
chatService.init(server);

// Connect to DB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'
mongoose.connect(mongoURI)
  .then(() => {
    const port = process.env.PORT || 4000;
    server.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })