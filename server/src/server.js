const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
app.get('/api', (req, res, next) => {
  res.json({ message: 'Hello World' });
});

// Connect to DB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'
mongoose.connect(mongoURI)
    .then(() => {
        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        });
    })