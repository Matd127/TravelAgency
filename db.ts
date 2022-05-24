const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: './routers/.env' });


export const connect =  () => {
    console.log(process.env.DB_CONNECT)
    mongoose.connect(process.env.DB_CONNECT)
    console.log('Mongo Connected!')
 }