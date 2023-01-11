export const setErrorMessage = (res, statusCode, message) => {
  res.status(statusCode).send({
    error: true,
    message,
  });
};
