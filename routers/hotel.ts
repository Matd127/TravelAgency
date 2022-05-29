import {Request, Response} from 'express'
import express from 'express';
import HotelModel from "../models/Hotel";
import { isAdmin, isAuth } from './tokenVerify';

const router = express.Router();
const app = express()
app.use(express.json())

router.post('/', isAuth, isAdmin, async (req: Request, res: Response)=>{
    const hotel = new HotelModel({
        name: req.body.name,
        description: req.body.description
    })
    try{
        await hotel.save();
        res.status(200).json("Added new hotel.")
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.get('/', async (req: Request, res: Response)=>{
    const hotels = await HotelModel.find()
    res.status(201).json(hotels)
})

router.get('/:id', async (req: Request, res: Response)=>{
    const hotel = await HotelModel.findById(req.params.id)
    res.status(201).json(hotel)
})

router.put('/:id', isAuth, isAdmin, async (req:Request, res: Response) => {
    const newHotel = new HotelModel(req.body.id)
    try{
        const updatedHotel = await HotelModel.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body
            },
            {
                new: true
            }
        )
        res.status(201).json(updatedHotel)
    }
    catch(error){
        return res.status(500).json(error)
    }
})

router.delete('/:id', isAuth, isAdmin, async (req:Request, res: Response) => {
    try{
        await HotelModel.findByIdAndDelete(req.params.id);
        return res.status(201).json("Hotel has been deleted.")
    }
    catch(error){
        return res.status(500).json(error)
    }
})

module.exports = router