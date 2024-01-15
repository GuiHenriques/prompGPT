import mongoose from "mongoose";

let isConnect = false;

export const connectToDB = async () => {
    
    mongoose.set("strictQuery", true);

    if ( isConnect ) {
        console.log("Already connected to MongoDB");
        
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            dbName: "share_prompt",
        });

        isConnect = true;
        console.log("MongoDB connected");

    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}