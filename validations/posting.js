import { body } from 'express-validator';

export const postCreateValidation = [
    body('title', 'Title length must be at least 5').isLength({ min: 5 }).isString(),
    body('text', 'Text length must be at least 10').isLength({ min: 10 }).isString(),
    body('tags', 'Invalid format').optional().isArray(),
    body('imageUrl', 'Invalid image url').optional().isString(),
];