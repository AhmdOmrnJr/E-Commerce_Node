let stackVar;

export const asyncHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch((error) => {
      stackVar = error.stack;
      const statusCode = parseInt(error.cause) || 500;
      return next(new Error(error.message, { cause: statusCode }));
    });
  };
};

export const globalResponse = (error, req, res, next) => {
  if (error) {
      const statusCode = parseInt(error.cause) || 500;
      if ((process.env.ENVIRONMENT = "dev")) {
        return res.status(statusCode).json({
          Message: "Failed",
          Error: error.message,
          Stack: stackVar,
        });
      }
      return res.status(statusCode).json({
        Message: "Failed",
        Error: error.message,
      });
    }
}

