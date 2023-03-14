const express = require('express')
const cartsRouter = express.Router()
const {getCartByUserId, getUserByToken, addProductToCart} = require('../db')

cartsRouter.get('/health', async (req, res, next) => {
    res.send({ message: "Healthy Carts Route." })
  });

cartsRouter.get('/:userId', async (req, res) => {
    const {userId} = req.params
    const cart = await getCartByUserId({userId})
    res.send(cart)
})

cartsRouter.post("/:productId", async (req, res) =>{
    const { productId } = req.params;
    const user = await getUserByToken(req.headers.authorization);
    console.log("user line 18:",user)
    if (!user) {
        res.status(401).send({ error: "Unauthorized" });
        return;
    }
    const cart = await getCartByUserId({ userId: user.id});
    console.log("cart line 24:", cart)
    await addProductToCart({ cartId: cart.id, productId });
    const updatedCart = await getCartByUserId({ userId: user.id });
    console.log("updatedCart line 27:", updatedCart)
    res.send(updatedCart);
})


module.exports = cartsRouter