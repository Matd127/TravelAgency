import express from 'express'
import {Request, Response} from 'express'
import {connect} from './db'

const paymentmetod = require('./routers/paymentmethod')
const app = express()
app.use(express.json())
connect();

app.use('/paymentMethos', paymentmetod)
app.listen(3000)