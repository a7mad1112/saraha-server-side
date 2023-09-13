import express from 'express';
import * as authController from './auth.controller.js';

const app = express();

app.get('/', authController.getAuth);
export default app;
