import * as dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import initApp from './src/app.router.js';
const app = express();
const PORT = 3000;
initApp(app, express);
app.listen(PORT, () => {
  console.log('Server is running at PORT ' + PORT);
});
