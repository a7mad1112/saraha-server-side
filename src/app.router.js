import msgRouter from './modules/msg/msg.router.js';
import authRouter from './modules/auth/auth.router.js';
import connectDB from '../db/connection.js';

const initApp = (app, express) => {
  connectDB()
  app.use(express.json());
  app.use('/msgs', msgRouter);
  app.use('/auth', authRouter);
  app.use('*', (req, res) => res.json({ msg: 'Page Not Found' }));
};

export default initApp;
