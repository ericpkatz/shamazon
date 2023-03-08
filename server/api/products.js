const express = require("express");
const productsRouter = express.Router();
const {getAllProducts, getProductById} = require("../db")

productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts()
        res.send(products)
    } catch (error) {
        next(error)
    }
})

productsRouter.get("/:id", async (req,res,next) => {
    const {id} = req.params
    try{
        const product = await getProductById(id)
        console.log(product)
        res.send(product)
    } catch (error){
        next(error)
    }
})


module.exports = productsRouter;