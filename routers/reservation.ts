import ReservationModel from "../models/Reservation";
import {Request, Response} from 'express'
import express from 'express';
import { isAdmin, isAuth } from "./tokenVerify";
import UserModel from "../models/User";
import TravelModel from "../models/Travel";

const jwt = require("jsonwebtoken");
const router = express.Router();
const app = express()
app.use(express.json())


//Rezerwacja, anulowanie rezerwacji, edycja danych, wyświetlanie własnych rezerwacji

router.post('/', async (req:Request, res:Response) => {
    const header = req.headers["authorization"]?.split(' ')[1];
    const user = jwt.decode(header, process.env.secret)
    const selectUser = await UserModel.findOne({login: user.login}).lean()
    const reservation =  new ReservationModel({
        numberOfPlaces: req.body.numberOfPlaces,
        name: req.body.name,
        surname: req.body.surname,
        dateOfBirth: req.body.dateOfBirth,
        street: req.body.street,
        postalCode: req.body.postalCode,
        travel: req.body.travel,
        user: selectUser,
        paymentMethod: req.body.paymentMethod
    })
    try{
        const selectedTravel = await TravelModel.findOne(reservation.travel)
        console.log(selectedTravel.isAvailable)

        if(selectedTravel.isAvailable == false)
           return res.status(400).json("This travel cannot be reserved")
        else{
            console.log(reservation.travel)          
            await TravelModel.findOneAndUpdate(selectedTravel,
            {
                $set: {isAvailable: false}
            },
            {
                new: true
            })
            await selectedTravel.save()
            console.log(selectedTravel)

            await reservation.save()
            return res.status(201).json("Done. Thank you for your reservation.")
        }
     }
    catch(error){
        res.status(500).json(error)
    }
})

router.delete('/cancel/:id',async (req:Request, res: Response) => {
    try{
        const header = req.headers["authorization"]?.split(' ')[1];
        const user = jwt.decode(header, process.env.secret)
        const selectUser = await UserModel.findOne({login: user.login})
        const selectReservation = await ReservationModel.findById(req.params.id)
        if(selectReservation.user.equals(selectUser._id))
        {
            await ReservationModel.deleteOne({selectReservation})
            return res.status(201).json("Reservation has been canceled")
        }
        else{
            return res.status(401).json("You cannot cancel this reservation")   
        }
    }
    catch(error){
        return res.status(500).json(error)
    }
})

//Wyswietlanie rezerwacji nalezacych do danego uzytkownika
router.get('/reservations',async (req:Request, res:Response) => {
    const header = req.headers["authorization"]?.split(' ')[1];
    const user = jwt.decode(header, process.env.secret)
    const reservations = await ReservationModel.find({user: user.login}).populate('travel').populate('user').populate('paymentMethod')
    return res.status(201).json(reservations)
})

//Wyswietlanie wszystkich rezerwacji admin only
router.get('/all', isAuth, isAdmin, async (req:Request, res:Response) => {
    const reservations = await ReservationModel.find().populate('travel').populate('user').populate('paymentMethod')
    return res.status(201).json(reservations)
})


module.exports = router