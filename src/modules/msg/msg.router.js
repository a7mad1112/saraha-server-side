import express from 'express';
import * as msgController from './msg.controller.js';

const app = express();

app.get('/', msgController.getMsgs);
export default app;
