import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connection successfull');
    } catch (error) {
        console.log('Database connection failes');
        process.exit(1);
    }
}

export default connectDB;