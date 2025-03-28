// eslint-disable-next-line import/prefer-default-export
export const createError = (status, message = "Something went wrong", detail = null) => {
  const err = new Error();
  // console.log("error message",message);
  
  err.status = status;
  err.message = message;
  err.detail = detail;
  return err;
};
