const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
var cors = require('cors')
const app = express()
const path = require('path')

const clients = require("../models/clientSchema")

const router = require('../routes/router')

dotenv.config()

app.use(cors())
app.use(cors({
    origin: 'https://client-management-backend.vercel.app/'
}))
app.use(express.json())
app.use(router)

app.use(express.static(path.join(__dirname, '../front-end/build')))

app.get('*', (req,res) => {
    res.sendFile(__dirname, '../front-end/build', 'index.html')
})

// mongoose.connect("mongodb+srv://hkardouni:hkardouni1364@cluster0.vxkppnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
})

app.listen(5000)