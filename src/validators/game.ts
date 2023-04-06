import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const game = {
  cal24,
};

export default game;

function cal24(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    numbers: Joi.array().items(Joi.number().required()).min(4).max(4).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
}
