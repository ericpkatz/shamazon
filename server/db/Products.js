const client = require('./client');

async function createProduct({name, price, description}){
    try{
        const product = `
        INSERT INTO products(name, price, description)
        VALUES($1,$2,$3)
        RETURNING *
        `;
        const response = await client.query(product, [name, price, description]);
        return response.rows[0];
    }
    catch(error){
        console.error("Error creating products")
        throw error;
    }
}

async function getProductById(id){
    try{
        const {rows: [productId]} = await client.query( `
        SELECT name, price FROM products
        WHERE id=$1
        `, [id]
        )
        return productId
    }
    catch(error){
        console.log(error)
    }
}

async function getAllProducts(){
    try{
        const {rows} = await client.query(
            `
            SELECT *
            FROM products
            `
        );
        return rows;
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {
    createProduct,
    getProductById,
    getAllProducts
};