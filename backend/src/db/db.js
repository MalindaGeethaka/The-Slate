
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true, autoIndex:true } };

const ConnectDB = async()=> {
  try {
    
    await mongoose.connect(MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log("connection error")
    console.log(error);
    await mongoose.disconnect();
  }
};
export default ConnectDB;

