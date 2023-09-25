import express from 'express';
import * as msgController from './msg.controller.js';
import { asyncHandler } from './../../middleware/errorHandling.js';

const app = express();

app.get('/', msgController.getMsgs);
app.post('/:receiverId', asyncHandler(msgController.sendMsg))
export default app;
