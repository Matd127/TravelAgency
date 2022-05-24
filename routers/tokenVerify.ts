import express from 'express'
import {Request, Response, NextFunction} from 'express'
import UserModel from "../models/User";

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config("./.env");
console.log(process.env.JWT_SECRET)


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if(header)
    {
        const token = header.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, async (err: any, data: any) => {
           if(err)
            return res.status(401).send("Access Denied")

            const tokenUser = JSON.parse(JSON.stringify(data))
            let dbUser = await UserModel.findOne({login: tokenUser.login})
            console.log(dbUser)
        })
    }
    next()
}
