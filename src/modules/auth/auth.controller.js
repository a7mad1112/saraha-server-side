import userModel from '../../../db/models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginSchema } from './auth.validation.js';
import sendEmail from '../../services/sendEmail.js';

export const signup = async (req, res) => {

  const { userName, email, password, gender } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return res.status(409).json({ msg: 'Email exist' });
  }

  const hashedPassword = await bcryptjs.hash(
    password,
    +process.env.SALT_ROUND
  );
  sendEmail(email, "Confirm Email", "<a href='#'>Verify email</a>")
  const createUser = await userModel.create({
    userName,
    email,
    password,
    gender,
    password: hashedPassword,
  });

  return res.status(201).json({ msg: 'success', user: createUser._id });

};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'Invalid data' });

  const match = bcryptjs.compareSync(password, user.password);
  if (!match) return res.status(404).json({ msg: 'Invalid data' });

  const token = jwt.sign({ id: user._id }, process.env.LOGIN_SIGNATURE, {
    expiresIn: '1h',
  });
  return res.status(200).json({ msg: 'success', token });
};
