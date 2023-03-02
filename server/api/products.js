const express = require("express");
const router = express.Router();
const {getAllProducts, getProductById} = require("../db")

router.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts()
        res.send(products)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req,res,next) => {
    const {id} = req.params
    try{
        const product = await getProductById(id)
        console.log(product)
        res.send(product)
    } catch (error){
        next(error)
    }
})


module.exports = router;