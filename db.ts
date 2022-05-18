import { ChangeStreamDocument } from "mongodb";
import mongoose from 'mongoose';


export const connect = async (): Promise<void> => {

    console.log("Connecting to Mongo...")
    const connString = 'mongodb+srv://Admin:Admin123@cluster0.iixlt.mongodb.net/?retryWrites=true&w=majority'
    const db = await mongoose.connect(connString)
    console.log('Mongo Connected!')

}