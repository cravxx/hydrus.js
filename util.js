class GenericApiError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotEnoughArgumentsError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ApiVersionMismatchError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    // Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { GenericApiError, NotEnoughArgumentsError, ApiVersionMismatchError };
