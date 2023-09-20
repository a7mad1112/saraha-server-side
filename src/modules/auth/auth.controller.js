import userModel from '../../../db/models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
  const createUser = await userModel.create({
    userName,
    email,
    password,
    gender,
    password: hashedPassword,
  });
  const emailToken = jwt.sign({ email }, process.env.EMAIL_TOKEN, { expiresIn: "1h" })
  const refreshToken = jwt.sign({ email }, process.env.EMAIL_TOKEN, { expiresIn: '1d' })// 1 day
  const link = `http://localhost:3000/auth/confirmEmail/${emailToken}`
  const refreshLink = `http://localhost:3000/auth/newConfirmEmail/${refreshToken}`
  const html = `<a href='${link}'>Verify email <br/> or <a href=${refreshLink}>request new email to verify your email</a></a>`
  sendEmail(email, "Confirm Email", html)
  return res.status(201).json({ msg: 'success', user: createUser._id });

};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'Invalid data' });


  if (!user.confirmEmail) {
    return res.status(400).json({ msg: 'plz confirm your email' });
  }

  const match = bcryptjs.compareSync(password, user.password);
  if (!match) return res.status(404).json({ msg: 'Invalid data' });

  const token = jwt.sign({ id: user._id }, process.env.LOGIN_SIGNATURE, {
    expiresIn: '1h',
  });
  return res.status(200).json({ msg: 'success', token });
};


export const confirmEmail = async (req, res) => {
  const { token } = req.params
  const decoded = jwt.verify(token, process.env.EMAIL_TOKEN)
  const user = await userModel.findOneAndUpdate({ email: decoded.email, confirmEmail: false }, { confirmEmail: true })
  if (!user)
    return res.json({ msg: "Your email verified" })
  if (user)
    return res.redirect('http://www.facebook.com')
}

export const newConfirmEmail = async (req, res, next) => {
  const { refreshToken } = req.params;
  const decoded = jwt.verify(refreshToken, process.env.EMAIL_TOKEN)


  const emailToken = jwt.sign({ email: decoded.email }, process.env.EMAIL_TOKEN, { expiresIn: "1h" })
  const link = `http://localhost:3000/auth/confirmEmail/${emailToken}`
  const html = `<a href='${link}'>Verify email</a>`
  sendEmail(decoded.email, "Confirm Email", html)

  return res.json({ msg: "new email sent" })
}