import { body } from "express-validator";

export const validateAccountCreation = [
    body("name").isString().notEmpty().withMessage("Name must be a string and not empty"),
    body("context").optional().isString().withMessage("Context must be a string"),
    body("amount").isInt({ min: 0 }).withMessage("Amount must be a non-negative integer"),
];
        
export const validateAccountUpdate = [
    body("name").optional().isString().notEmpty().withMessage("Name must be a string and not empty"),
    body("context").optional().isString().withMessage("Context must be a string"),
    body("amount").optional().isInt({ min: 0 }).withMessage("Amount must be a non-negative integer"),
];