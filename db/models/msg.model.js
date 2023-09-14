import { Schema, Types, model } from 'mongoose';

const msgSchema = new Schema(
  {
    msg: {
      type: String,
      required: true,
    },
    receiverId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);


const msgModel = model.msg || model("Msg", msgSchema)

export default msgModel;