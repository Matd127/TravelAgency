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
        res.status(200).json("Added new Payment: " + newPaymentMethod)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.get('/', async (req: Request, res: Response)=>{
    const payments = await PaymentMethodModel.find()
    res.status(201).json(payments)
})

router.get('/:id', async (req: Request, res: Response)=>{
    const payment = await PaymentMethodModel.findById(req.params.id)
    res.status(201).json(payment)
})

router.put('/:id', async (req: Request, res: Response)=>{
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
        res.status(500).json(error)
    }

})
router.delete('/:id', async (req: Request, res: Response) =>{
    try{
        await PaymentMethodModel.findByIdAndDelete(req.params.id);
        res.status(201).json("Method has been deleted.")
    }
    catch(error){
        res.status(500).json(error)
    }

})
module.exports = router