import mongoose, { Schema, model } from 'mongoose';
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: 'Male',
      enum: ['Male', 'Female'],
    },
  },
  {
    timestamps: true,
  }
);

export default userModel = mongoose.model.User || model('User', userSchema);
