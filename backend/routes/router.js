const express = require('express');
const clients = require('../models/clientSchema');
const router = express.Router()


router.post('/addclient', async (req, res) => {
    console.log(req.body);

    const { name, phoneNumber, companyName } = req.body

    if (!name || !phoneNumber || !companyName) {
        res.status(404).json('Please fill the Data')
    }

    try {
        const preClient = await clients.findOne({ phoneNumber: phoneNumber })

        if (preClient) {
            res.status(404).json("This Client already exists")
        } else {
            const addClient = new clients({ name, phoneNumber, companyName })

            await addClient.save()

            res.status(201).json(addClient)
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

router.get('/getall', async (req, res) => {
    try {
        const allClients = await clients.find()

        if (!allClients) {
            res.status(404).json('There is no client.')
        } else {
            res.json(allClients)
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getclient/:id', async (req, res) => {
    try {
        const preClient = await clients.findById(req.params.id)

        res.json(preClient)
    } catch (error) {
        res.status(500).json('Something went wrong')
    }
})

router.delete('/deleteclient', (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const clientId = req.params.id
        const updateData = req.body

        const client = await clients.findByIdAndUpdate(clientId, updateData, { new: true })

        if (!client) {
            res.status(404).json('Client not found.')
        }

        res.status(200).json(client)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/remove/:id', async (req, res) => {
    const clientId = req.params.id

    const deletedClient = await clients.findByIdAndDelete(clientId)
    
    if (!deletedClient) {
        res.status(404).json('Client not found')
    }

    res.json('Client Deleted Successfully')
})
module.exports = router