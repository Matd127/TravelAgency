import mongoose from "mongoose";

const DepartureCitySchema = new mongoose.Schema({
    city:{
        type: String,
         required: true
    },
    travelBy:{
        type: String, 
        required: true
    }
})

const DepartureCityModel = mongoose.model("DepartureCity", DepartureCitySchema)
export default DepartureCityModel
