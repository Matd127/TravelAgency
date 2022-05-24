import UserModel from "../models/User";
import {Request, Response, NextFunction} from 'express'
import express from 'express';
import bcrypt from 'bcrypt';

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config("./.env");

const router = express.Router();
const app = express()


app.use(express.json())


router.post('/login',async (req:Request, res:Response) => {
    try{
        const {login, password} = req.body;

        if(!login || !password)
            return res.status(400).json("Empty values.")
        
        const existsUser = await UserModel.findOne({login}).lean()

        if(!existsUser)
            return res.status(401).json("Bad login or password.")

        if(await bcrypt.compare(password, existsUser.password)){

            const token = jwt.sign(
                {
                    _id: existsUser.id,
                    login: existsUser.login
                }, 
                process.env.JWT_SECRET
            )
            res.status(201).json({token})
        }
       
    }
    catch(error){
        return res.status(500).json(error)
    }
})

router.post('/register',async (req:Request, res:Response) => {
    try{
        const {login, email, phoneNumber, password: passwordBody} = req.body;

        if(!login || !email || !phoneNumber || !passwordBody)
           return res.status(400).json("Empty values.")

        const isUserExists = await UserModel.findOne({login})

        if(isUserExists)
           return res.status(401).json("User exists.")

        const password = await bcrypt.hash(passwordBody, 10)

        const newUser = await new UserModel({
            login, 
            password, 
            email, 
            phoneNumber
        }).save()

        return res.status(200).json(newUser)
    }
    catch(error){
        return res.status(500).json(error)
    }
   
})

module.exports = router