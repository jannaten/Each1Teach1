const createError = (status, message) => {
  const error = new Error(message);
  error.name = 'HttpException';
  error.status = status;
  return error;
};

const errorHandler = (error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(error);
  }

  switch (error.name) {
    case 'CastError':
      return res.status(400).json({
        errors: {
          [error.path]: {
            properties: {
              message: `${error.path} invalid`,
              type: 'invalid',
              path: error.path,
              value: error.value
            },
            kind: error.kind
          }
        },
        _message: 'CastError',
        message: `CastError: invalid format of path ${error.path}`
      });
    case 'ValidationError':
      return res.status(400).json(error);
    case 'TokenExpiredError':
      return res.status(401).send('token expired');
    case 'JsonWebTokenError':
      return res.status(401).send('token invalid');
    case 'HttpException':
      return res
        .status(error.status || 500)
        .send(error.message || 'internal server error');
    case 'SyntaxError':
      return res.status(error.status).send(error.message);
    default:
      return res.status(500).send('internal server error');
  }
};

module.exports = {
  createError,
  errorHandler
};
