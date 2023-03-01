const client = require('./client');

async function addProductToCart({cartId, productId, quantity, routineId, activityId}) {
    try {
        const {rows} = await client.query(`
        INSERT INTO cart_products("cart_id", "product_id", quantity)
        VALUES($1, $2, $3)
        RETURNING *
        `, [routineId, activityId, cartId, productId, quantity])
        return rows;
    } catch (error) {
        throw error
    }
}

async function updateCartProduct({id, ...fields}){
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
      try {
        const {rows} = await client.query(`
        UPDATE cart_products
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *
        `, Object.values(fields))
        return rows
      } catch (error) {
        throw error
      }
}

async function destroyCartProduct(id){
    try {
        const {rows} = await client.query(`
        DELETE FROM cart_products
        WHERE id=$1
        RETURNING *
        `, [id])
        return rows
    } catch (error) {
        throw error
    }
}

module.exports = {
    addProductToCart,
    updateCartProduct,
    destroyCartProduct
}