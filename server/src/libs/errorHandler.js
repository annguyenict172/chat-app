const { validationResult } = require('express-validator');

const errors = require('./errors');

const catchError = (handler) => (req, res, next) => {
  // Handle validation error
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    return res.jsonError(
      errors.validationError(validationErrors.array())
    );
  }

  // Handle internal server error
  const isAsync = handler.constructor.name === "AsyncFunction";
  if (!isAsync) {
    try {
      return handler(req, res, next);
    } catch (error) {
      console.log(error);
      return res.jsonError(errors.internalServerError());
    }
  } else {
    return handler(req, res, next)
      .catch(error => {
        console.log(error);
        return res.jsonError(errors.internalServerError());
      });
  }
}

module.exports = {
  catchError
}