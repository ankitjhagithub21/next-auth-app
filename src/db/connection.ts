import { errorMonitor } from "events";
import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on("connected",()=>{
            console.log("MongoDb connected.")
        })

        connection.on("error",(err)=>{
            console.log("Mongodb connection error."+err)
            process.exit()
        })

    } catch (error) {
        console.log("Error in connecting Db.")
        console.log(error)
    }
}