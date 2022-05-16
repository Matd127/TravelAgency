import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }

}) 
const HotelModel = mongoose.model("Hotel", HotelSchema);
export default HotelModel