import {Request, Response} from 'express'
import express from 'express';
import HotelModel from "../models/Hotel";

const router = express.Router();
const app = express()
app.use(express.json())

router.post('/', async (req: Request, res: Response)=>{
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


module.exports = router