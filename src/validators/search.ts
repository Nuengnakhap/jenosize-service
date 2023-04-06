import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const search = {
  restaurant,
};

export default search;

function restaurant(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    query: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
}
