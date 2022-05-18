import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    login:{
        type: String,
        required: true,
        unique: true},
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
    email:{
        type: String, 
        required: true
    },
    phoneNumber:{
        type: String, 
        required: true,
        length: 9
    }
})

const UserModel = mongoose.model("User", UserSchema);
export default UserModel