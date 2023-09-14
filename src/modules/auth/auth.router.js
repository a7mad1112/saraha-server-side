import express from 'express';
import * as authController from './auth.controller.js';

const app = express();

app.post('/signup', authController.signup);
app.post('/login', authController.login);
export default app;
