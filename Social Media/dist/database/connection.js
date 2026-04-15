import mongoose from 'mongoose';
export const DbConnection = async () => {
    await mongoose.connect("mongodb://localhost:27017/SocialMedia");
};
