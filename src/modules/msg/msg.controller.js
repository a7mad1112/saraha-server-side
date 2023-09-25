import userModel from './../../../db/models/user.model.js';
import msgModel from './../../../db/models/msg.model.js';
export const getMsgs = async (req, res) => {
  const msgsList = await msgModel.find({ receiverId: req.user._id })
  return res.json({ msg: 'success', msgsList });
};


export const sendMsg = async (req, res) => {
  const { receiverId } = req.params
  const { msg } = req.body

  const user = await userModel.findById(receiverId);
  if (!user) {
    return res.status(404).json({ msg: "User not found" })
  }
  const createMsg = await msgModel.create({ msg, receiverId })
  return res.status(201).json({ msg: "success" });
}