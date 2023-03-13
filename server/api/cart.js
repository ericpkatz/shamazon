const express = require('express')
const cartsRouter = express.Router()
const {getCartByUserId} = require('../db')

app.get('/:userId', async (req, res) => {
    const {userId} = req.params
    const cart = await getCartByUserId({userId})
    res.send(cart)
})

module.exports = cartsRouter