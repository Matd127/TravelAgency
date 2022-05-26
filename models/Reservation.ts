import mongoose from "mongoose"

const ReservationSchema = new mongoose.Schema({
    number_of_places:{
        type: Number, 
        required: true,
        min: 1,
        max: 6
    },
    name:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: Date,
        required: true       
    },
    street:{
        type: String,
        required: true
    },
    postalCode:{
        type: String,
        required: true,
        maxlength: 6
    },
    travel:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Travel'
    },
    user:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    paymentMethod:{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentMethod'
    }
})

const ReservationModel = mongoose.model("Reservation", ReservationSchema)
export default ReservationModel