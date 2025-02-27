// eslint-disable-next-line import/prefer-default-export
export const createError = (status, message = "Something went wrong", detail = null) => {
  const err = new Error(message);
  err.status = status;
  err.detail = detail;
  return err;
};
