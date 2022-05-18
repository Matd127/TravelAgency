import UserModel from "../models/User";
import {Request, Response} from 'express'
import express from 'express';

const router = express.Router();
const app = express()
app.use(express.json())

router.post('/login',async (req:Request, res:Response) => {
    
})

router.post('/register',async (req:Request, res:Response) => {
    
})


module.exports = router