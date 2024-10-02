import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("database connected.")

    } catch (error) {
        console.log("Error in connecting Db.")
        console.log(error)
        process.exit(1); 
    }
}