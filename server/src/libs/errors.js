const HTTP_STATUS = {
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
}

class Error {
  constructor(httpStatusCode, errorMessage, errorData = null) {
    this.httpStatusCode = httpStatusCode;
    this.errorMessage = errorMessage;
    this.errorData = errorData;
  }

  toJSON() {
    return {
      errorMessage: this.errorMessage,
      errorData: this.errorData
    };
  }
}

const errors = {
  unauthorizedError: () => new Error(
    HTTP_STATUS.UNAUTHORIZED,
    'Unauthorized'
  ),
  invalidCredentialError: () => new Error(
    HTTP_STATUS.UNAUTHORIZED,
    'Your email or password is wrong. Please check again.'
  ),
  internalServerError: () => new Error(
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
    'Internal Server Error'
  ),
  badRequestError: (errorMessage) => new Error(
    HTTP_STATUS.BAD_REQUEST,
    errorMessage
  ),
  forbiddenError: () => new Error(
    HTTP_STATUS.FORBIDDEN,
    'Invalid Access'
  ),
  validationError: (errorData) => new Error(
    HTTP_STATUS.BAD_REQUEST,
    'Validation Error',
    errorData
  ),
  unverifiedAccountError: () => new Error(
    HTTP_STATUS.FORBIDDEN,
    'Your account is not yet verified.'
  )
};

module.exports = errors;
