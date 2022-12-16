import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "Invalid email format").isEmail(),
  body("password", "Password must be at least 5 characters").isLength({
    min: 5,
  }),
  body("fullName", "Name is required").isLength({ min: 3 }),
  body("avatarUrl", "Wrong avatar link").optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Enter article title').isLength({min:3}).isString(),
  body('text', 'Enter article text').isLength({min:10}).isString(),
  body('tags', 'Specify tags format(Specify Array)').optional().isString(),
  body('imageUrl', 'Invalid image link').optional().isString()
]
