import mongoose from 'mongoose';
export async function connectDB(){
  if(!process.env.MONGODB_URI){console.warn('MONGODB_URI is not configured. Running in demo mode without persistent database.');return false;}
  try{await mongoose.connect(process.env.MONGODB_URI);console.log('MongoDB connected');return true;}
  catch(err){console.error('MongoDB connection failed:',err.message);throw err;}
}
