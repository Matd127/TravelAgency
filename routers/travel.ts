import TravelModel from "../models/Travel";
import {Request, Response} from 'express'
import express from 'express';

const router = express.Router();
const app = express()
app.use(express.json())

//Niezalogowany moze wyswietlac wszystkie dostepne wycieczki
//Reszta dla admina :)) 


router.post('/', async (req:Request, res: Response) => {
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
        isAvaliable: req.body.isAvailable
    })
    try{
        const saveTravel = await newTravel.save()
        res.status(201).json("Travel added." + newTravel)
    }
    catch(error){
        res.status(500).json(error)
    }
})


//Wyswietlanie wycieczek typu LastMinute

router.get('/lastminute',async (req:Request, res: Response) => {
    const travels = await TravelModel.find({isLastMinute: true})
    .populate('departureCity')
    .populate('hotel')

    return res.status(201).json(travels)
})

//Wyswietlanie wszystkich wycieczek, które są dostępne


//Wyswietlanie wszystkich dostępnych wycieczek
router.get('/',async (req:Request, res: Response) => {
    const travels = await TravelModel.find({isAvaliable: true})
    .populate('departureCity')
    .populate('hotel')

    return res.status(201).json(travels)
})

//Wyswietlanie wszystkich wycieczek (Admin)
router.get('/all',async (req:Request, res: Response) => {
    const travels = await TravelModel.find()
    .populate('departureCity')
    .populate('hotel')

    return res.status(201).json(travels)
})





module.exports = router