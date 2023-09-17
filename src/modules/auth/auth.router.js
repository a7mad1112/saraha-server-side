import express from 'express';
import * as authController from './auth.controller.js';
import { asyncHandler } from '../../middleware/errorHandling.js';
const app = express();

app.post('/signup', asyncHandler(authController.signup));
app.post('/login', asyncHandler(authController.login));
export default app;
