import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateRequestBody = [
  body("image").isString().withMessage("Image must be a base64 string"),
  body("customer_code").isString().withMessage("Customer code must be a string"),
  body("measure_datetime").isISO8601().withMessage("Measure datetime must be a valid ISO 8601 date"),
  body("measure_type").isIn(["WATER", "GAS"]).withMessage("Measure type must be either WATER or GAS"),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
