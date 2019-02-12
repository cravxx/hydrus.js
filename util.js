class GenericApiError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ClientApiWindowNotOpen extends GenericApiError {
  constructor(query, apierror) {
    super('Client API Window is not open!');
    this.data = query;
  }
}

const isJSON = (str, callback) => {
  try {
    callback(JSON.parse(str));
  } catch (e) {
    callback(null);
  }
};

module.exports = { GenericApiError, ClientApiWindowNotOpen, isJSON };
