const express = require('express');
const router = express.Router();

router.get('/health', async (req, res, next) => {
  res.send({ message: "Healthy server" })
});

// ROUTER: /api/users
const usersRouter = require('./users')
router.use('/users', usersRouter)

const cartRouter = require('./cart');
router.use('/carts', cartRouter);

// ROUTER: /api/products
const productsRouter = require('./products');
router.use('/products', productsRouter);

router.use((err, req, res, next) => {
    res.status(err.status || 500)
    if(err.status){
      delete err.status
    }
    res.send(err)
  })

  module.exports = router;