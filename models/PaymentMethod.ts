import mongoose from "mongoose";

const PaymentMethodSchema = new mongoose.Schema({
    isOnlinePayment: {
        type: Boolean, 
        required: true
    },
    typeOfPayment:{
        type: String, 
        required: true
    }
})

const PaymentMethodModel = mongoose.model("PaymentMethod", PaymentMethodSchema);
export default PaymentMethodModel