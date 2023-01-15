import { logError } from "./log-error.js";

export const setErrorMessage = (
  res,
  statusCode,
  message,
  additionalParams = {}
) => {
  res.status(statusCode).send({
    error: true,
    message,
    ...additionalParams,
  });
};

export const setMessage = (res, message, additinalParams = {}) => {
  res.send(message ? { message, ...additinalParams } : { ...additinalParams });
};

export const setInternalErrorMessage = (res, error) => {
  setErrorMessage(res, 500, "Something went wrong, please try again.");
  console.log({ error });
  logError(error.toString());
};
