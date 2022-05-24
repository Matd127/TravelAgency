import mongoose, { SchemaTypes } from "mongoose"

const TravelSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    content:{
        type: String, 
        required: true
    },
    isLastMinute:{
        type: Boolean, 
        required: true
    },
    destination:{
        type: String, 
        required: true
    },
    price:{
        type: Number, 
        required: true
    },
    travelDate:{
        type: Date, 
        required: true
    },
    returnDate:{
        type: Date, 
        required: true
    },
    departureCity:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DepartureCity'
    },
    hotel:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    isAvailable:{
        type: Boolean,
        required: true
    }
})

const TravelModel = mongoose.model("Travel", TravelSchema)
export default TravelSchema