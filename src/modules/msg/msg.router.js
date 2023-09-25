import express from 'express';
import * as msgController from './msg.controller.js';
import { asyncHandler } from './../../middleware/errorHandling.js';
import authMiddleware from './../../middleware/auth.middleware.js';

const app = express();

app.get('/', authMiddleware,msgController.getMsgs);
app.post('/:receiverId', asyncHandler(msgController.sendMsg))
export default app;
