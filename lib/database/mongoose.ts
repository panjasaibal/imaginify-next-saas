import mongoose, {Mongoose} from "mongoose";

const MONGO_URI = process.env.MONGO_URL;

interface MongooseConection{
    conn: Mongoose|null,
    promise:Promise<Mongoose>|null
}
/* eslint-disable @typescript-eslint/no-explicit-any */
let cached: MongooseConection = (global as any).mongoose;

if(!cached){
    /* eslint-disable @typescript-eslint/no-explicit-any */
    cached = (global as any).mongoose = { conn:null, promise:null }
}

export const ConnectToDatabase = async()=>{
    if(cached.conn){
        return cached.conn;
    }
    if(!MONGO_URI) throw new Error("Mongo uri is not present");

    cached.promise = cached.promise || mongoose.connect(MONGO_URI,{
        dbName:'imaginify',
        bufferCommands:false
    })

    cached.conn = await cached.promise;
    
    return cached.conn;
}