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


//Rezerwacja, anulowanie rezerwacji, edycja danych, rezygnacja z rezerwacji

router.post('/', async (req:Request, res:Response) => {
    const header = req.headers["authorization"]?.split(' ')[1];
    const user = jwt.decode(header, process.env.secret)
    const selectUser = await UserModel.find({login: user.login}).lean()
    const reservation =  new ReservationModel({
        number_of_places: req.body.number_of_places,
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
        // const selectedTravel = await TravelModel.find({travel})
        const saveReservation = await reservation.save()
        res.status(201).json("Done." + reservation)
     }
    catch(error){
        res.status(500).json(error)
    }
})


module.exports = router