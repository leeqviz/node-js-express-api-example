import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password length must be at least 5').isLength({ min: 5 }),
    body('name', 'Name length must be at least 5').isLength({ min: 5 }),
    body('avatarUrl', 'Invalid avatar url').optional().isURL(),
];

export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password length must be at least 5').isLength({ min: 5 }),
];