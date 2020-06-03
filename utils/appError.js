//1 Class inheritance from the other which is error
//we call super in order to call the parent constructor
//we do that with message because message is the only parameter that the built in error accepts

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
