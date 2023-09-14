import userModel from '../../../db/models/user.model.js';
import bcryptjs from 'bcryptjs';
export const signup = async (req, res) => {
  const { userName, email, password, gender } = req.body;

  const user = await userModel.findOne({ email });
  if (user) {
    return res.json({ msg: 'Email exist' });
  }

  const hashedPassword = await bcryptjs.hash(password, +process.env.SALT_ROUND);

  const createUser = await userModel.create({
    userName,
    email,
    password,
    gender,
    password: hashedPassword,
  });

  return res.json({ msg: 'success', user: createUser._id });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.json({ msg: 'Invalid data' });

  const match = bcryptjs.compareSync(password, user.password)
  if (!match) return res.json({ msg: 'Invalid data' });

  return res.json(user);
};
