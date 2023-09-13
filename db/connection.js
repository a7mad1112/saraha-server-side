import mongoose from 'mongoose';
const connectDB = async () => {
  return await mongoose
    .connect(process.env.LOCAL_DB)
    .then(() => {
      console.log('DB connected');
    })
    .catch((err) => {
      console.log('Error connect DB', err);
    });
};

export default connectDB;
