import express from 'express'
import {Request, Response, NextFunction} from 'express'
import UserModel from "../models/User";

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({
    path: './.env'
});


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if(header) {
        const token = header.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, async (err: any, data: any) => {
           if(err)
            return res.status(401).send("Access Denied")

            const tokenUser = JSON.parse(JSON.stringify(data))
            let user = await UserModel.findOne({login: tokenUser.login})

            // console.log("Am i admin? " + user.isAdmin)
            res.locals.userInf = user
        })       
        next()
    }
    else{
        res.status(401).send("Access Denied")
    }

}

export const isAdmin = (req: Request, res: Response, next: NextFunction) =>{
    isAuth(req, res, async () => {
        let user = await UserModel.findOne({isAdmin: true})
        console.log(res.locals.userInf.isAdmin == true)

        if(!res.locals.userInf.isAdmin)
            return res.status(401).send("Sorry you aren't an admin *sad*")
        else
            next()
    })
}
