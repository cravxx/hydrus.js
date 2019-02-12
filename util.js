class GenericApiError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const isJSON = (str, callback) => {
  try {
    callback(JSON.parse(str));
  } catch (e) {
    callback(null);
  }
};

module.exports = { GenericApiError, isJSON };
