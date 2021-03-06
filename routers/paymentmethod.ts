import PaymentMethodModel from "../models/PaymentMethod";
import {Request, Response} from 'express'
import express from 'express';
import { isAdmin, isAuth } from "./tokenVerify";

const router = express.Router();
const app = express()
app.use(express.json())

router.post('/', isAuth, isAdmin, async (req: Request, res: Response)=>{
    const newPaymentMethod = new PaymentMethodModel({
        isOnlinePayment: req.body.isOnlinePayment,
        typeOfPayment: req.body.typeOfPayment
    })
    try{
        const savePaymentMethod = await newPaymentMethod.save();
        return res.status(200).json("Added new Payment: " + newPaymentMethod)
    }
    catch(error){
        return res.status(500).json(error)
    }
})

router.get('/', async (req: Request, res: Response)=>{
    const payments = await PaymentMethodModel.find()
    return res.status(201).json(payments)
})

router.get('/:id', async (req: Request, res: Response)=>{
    const payment = await PaymentMethodModel.findById(req.params.id)
    return res.status(201).json(payment)
})

router.put('/:id', isAuth, isAdmin, async (req: Request, res: Response)=>{
    const newPaymentMethod = new PaymentMethodModel(req.body.id)
    try{
        const updatedPayment = await PaymentMethodModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { 
                new: true 
            }
       )
       res.status(201).json(updatedPayment)
    }
    catch(error){
        return res.status(500).json(error)
    }

})
router.delete('/:id', isAuth, isAdmin, async (req: Request, res: Response) =>{
    try{
        await PaymentMethodModel.findByIdAndDelete(req.params.id);
        return res.status(201).json("Method has been deleted.")
    }
    catch(error){
        return res.status(500).json(error)
    }

})
module.exports = router