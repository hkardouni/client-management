const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true
    }
})

const clients = new mongoose.model("clients", clientSchema)

module.exports=clients