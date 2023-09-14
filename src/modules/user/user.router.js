import express from 'express';
import * as userController from './user.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';
const app = express();

app.get('/profile', authMiddleware, userController.profile);
export default app;
