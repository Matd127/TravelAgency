import TravelModel from "../models/Travel";
import {Request, Response} from 'express'
import express from 'express';
import { isAdmin, isAuth } from "./tokenVerify";

const router = express.Router();
const app = express()
app.use(express.json())

router.post('/',  isAuth, isAdmin, async (req:Request, res: Response) => {
    const newTravel = new TravelModel({
        name: req.body.name,
        content: req.body.content,
        isLastMinute: req.body.isLastMinute,
        destination: req.body.destination, 
        price: req.body.price,
        travelDate: req.body.travelDate,
        returnDate: req.body.returnDate,
        departureCity: req.body.departureCity,
        hotel: req.body.hotel,
        isAvailable: req.body.isAvailable
    })
    try{
        const saveTravel = await newTravel.save()
        res.status(201).json("Travel added." + newTravel)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.get('/lastminute', async (req:Request, res: Response) => {
    const travels = await TravelModel.find({isLastMinute: true})
    .populate('departureCity')
    .populate('hotel')

    return res.status(201).json(travels)
})

router.get('/', async (req:Request, res: Response) => {
    const travels = await TravelModel.find({isAvailable: true})
    .populate('departureCity')
    .populate('hotel')

    return res.status(201).json(travels)
})

router.get('/all', isAuth, isAdmin, async (req:Request, res: Response) => {
    const travels = await TravelModel.find()
    .populate('departureCity')
    .populate('hotel')

    return res.status(201).json(travels)
})

router.put('/:id', isAuth, isAdmin,async (req:Request, res: Response) => {
    const travel = new TravelModel(req.body.id)
    try{
        const updateTravel = await TravelModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { 
                new: true 
            }
       )
       res.status(201).json(updateTravel)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.delete('/:id', isAuth, isAdmin,async (req:Request, res: Response) => {
    try{
        await TravelModel.findByIdAndDelete(req.params.id);
        res.status(201).json("Travel has been deleted.")
    }
    catch(error){
        res.status(500).json(error)
    }
})

module.exports = router