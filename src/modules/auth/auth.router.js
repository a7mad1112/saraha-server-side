import express from 'express';
import * as authController from './auth.controller.js';
import { asyncHandler } from '../../middleware/errorHandling.js';
import validation from '../../middleware/validation.js';
import { loginSchema, signupSchema } from './auth.validation.js';
const app = express();

app.post('/signup', validation(signupSchema), asyncHandler(authController.signup));
app.post('/login', validation(loginSchema), asyncHandler(authController.login));
export default app;
