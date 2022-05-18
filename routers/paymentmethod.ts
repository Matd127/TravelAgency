import PaymentMethodModel from "../models/PaymentMethod";
import {Request, Response} from 'express'
import express from 'express';

const router = express.Router();
const app = express()
app.use(express.json())

router.post('/', async (req: Request, res: Response)=>{
    const newPaymentMethod = new PaymentMethodModel({
        isOnlinePayment: req.body.isOnlinePayment,
        typeOfPayment: req.body.typeOfPayment
    })
    try{
        const savePaymentMethod = await newPaymentMethod.save();
        res.status(200).send("Added new Payment: " + newPaymentMethod)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.get('/', async (req: Request, res: Response)=>{
    const payments = await PaymentMethodModel.find()
    res.send(payments)
})
module.exports = router