const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ 
    path: './routers/.env' 
});


export const connect = () => {
    console.log("Connecting to Mongo...")
    mongoose.connect(process.env.DB_CONNECT)
    console.log('Mongo Connected!')
 }