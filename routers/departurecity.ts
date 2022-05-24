import DepartureCityModel from "../models/DepartureCity";
import { Request, Response } from "express";
import express from 'express';
import { isAdmin, isAuth } from "./tokenVerify";

const router = express.Router();
const app = express()
app.use(express.json())

router.post('/',  async (req: Request, res: Response)=>{
    const newPaymentMethod = new DepartureCityModel({
        city: req.body.city,
        travelBy: req.body.travelBy
    })
    try{
        const savePaymentMethod = await newPaymentMethod.save();
        res.status(200).json("Added new city.")
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.get('/', isAuth, isAdmin, async (req: Request, res: Response)=>{
    const cities = await DepartureCityModel.find()
    res.status(201).json(cities)
})

router.get('/:id', async (req: Request, res: Response)=>{
    const city = await DepartureCityModel.findById(req.params.id)
    res.status(201).json(city)
})

router.put('/:id',async (req:Request, res:Response) => 
{
    const depcity = new DepartureCityModel(req.body.id)
    try{
        const updatedcity = await DepartureCityModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { 
                new: true 
            }
       )
       res.status(201).json(updatedcity)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.delete('/:id',async (req:Request, res:Response) => {
    try{
        await DepartureCityModel.findByIdAndDelete(req.params.id);
        res.status(201).json("City has been deleted.")
    }
    catch(error){
        res.status(500).json(error)
    }
})


module.exports = router