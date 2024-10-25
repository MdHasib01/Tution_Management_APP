import mongoose from "mongoose";

const mongoDbUrl =
  "mongodb+srv://ibnsina942:OHsgc2L3ewcFL8Qu@ibnsinacluster0.ntwtm.mongodb.net/authDB";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDbUrl);
    console.log(`MongoDB Connected !`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
