const client = require('./client');

async function createCart({user_id}){
    try {
        const {row:[cart]} = await client.query(`
        INSERT INTO carts (user_id)
        VALUES($1)
        ON CONFLICT (user_id) DO NOTHING
        RETURNING *
        `, [user_id]);
        return cart;
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    createCart
}