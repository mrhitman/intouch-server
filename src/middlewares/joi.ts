import * as joi from "joi";
import HttpError from "../error";

export default schema => {
  return (req, res, next) => {
    const validation = joi.validate(req.body, schema);
    if (validation.error) {
      return next(new HttpError(validation.error, 400));
    }
    next();
  };
};
