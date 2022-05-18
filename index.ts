import express from 'express'
import {Request, Response} from 'express'
import {connect} from './db'

const paymentmetods = require('./routers/paymentmethod')
const departurecities = require('./routers/departurecity')
const hotels = require('./routers/hotel')
const app = express()
app.use(express.json())
connect();

app.use('/hotels', hotels)
app.use('/departurecities', departurecities)
app.use('/paymentmethods', paymentmetods)
app.listen(3000)