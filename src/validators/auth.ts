import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const auth = {
  login,
};

export default auth;

function login(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
}
