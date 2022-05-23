import express from 'express'
import {Request, Response} from 'express'
import {connect} from './db'

const paymentmetods = require('./routers/paymentmethod')
const departurecities = require('./routers/departurecity')
const hotels = require('./routers/hotel')
const users = require('./routers/user')
const app = express()
app.use(express.json())
connect();

app.use('/users', users)
app.use('/hotels', hotels)
app.use('/departurecities', departurecities)
app.use('/paymentmethods', paymentmetods)
app.listen(3000)