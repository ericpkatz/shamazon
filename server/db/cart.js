const client = require('./client');

async function createCart({user_id}){
    try {
        const {rows:cart} = await client.query(`
        INSERT INTO carts (user_id)
        VALUES($1)
        RETURNING *
        `, [user_id]);
        return cart;
    }
    catch(error){
        console.log(error)
    }
}

const getCartByUserId = async ({userId}) => {
    const {rows: cart} = await client.query(`
    SELECT * FROM carts
    WHERE user_id = $1
    `, [userId])
    const {rows:products} = await client.query(`
    SELECT * FROM cart_products
    LEFT JOIN products ON cart_products.product_id = products.id
    WHERE cart_products.cart_id = $1
    `, [cart.id])
    cart.products= products
    return cart
}

module.exports = {
    createCart,
    getCartByUserId
}