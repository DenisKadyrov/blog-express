import { body } from 'express-validator';

// register validation
export const registerValidation = [
  body('email', "Not correct email").isEmail(),
  body('password', "Not correct password").isLength({min: 8}),
  body('fullName', "Not correct user name").isLength({min: 3}),
  body('avatarUrl', "Not correct url").optional().isURL(),
];

// Login validation
export const loginValidation = [
  body('email', "Not correct email").isEmail(),
  body('password', "Not correct password").isLength({min: 8}),
];

// validation create post 
export const postCreateValidation = [
  body('title', "Please, enter post title").isLength({min: 3}).isString(),
  body('text', "Please, write post text").isLength({min: 5}).isString(),
  body('tags', "tags should be array").optional().isString(),
  body('imageUrl', "Not correct image url").optional().isString(),
];
