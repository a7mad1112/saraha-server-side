import jwt from 'jsonwebtoken';
import userModel from '../../db/models/user.model.js';
import { asyncHandler } from './errorHandling.js';
const authMiddleware = asyncHandler(
  async (req, res, next) => {
    const { authorization } = req.headers;
    const { BEARER_KEY, LOGIN_SIGNATURE } = process.env;
    if (!authorization?.startsWith(BEARER_KEY)) {
      return res.json({ msg: 'Invalid authorization' });
    }
    const token = authorization.split(BEARER_KEY)[1];
    if (!token) {
      return res.json({ msg: 'Invalid authorization' });
    }
    const decoded = jwt.verify(token, LOGIN_SIGNATURE);

    const authUser = await userModel
      .findById(decoded.id)
      .select('userName email');
    if (!authUser) {
      return res.json({ msg: 'not registerd account' });
    }
    req.user = authUser;
    next();
  }
)

export default authMiddleware;
