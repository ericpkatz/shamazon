const client = require('./client');
const {
  getUserByToken,
  createUser,
  authenticate
} = require('./User');

const syncTables = async()=> {
  const SQL = `
  DROP TABLE IF EXISTS product_tags;
  DROP TABLE IF EXISTS cart_products;
  DROP TABLE IF EXISTS products;
  DROP TABLE IF EXISTS carts;
  DROP TABLE IF EXISTS users;



  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

  CREATE TABLE carts(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) 
  );

  CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER
  );

  CREATE TABLE cart_products(
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(id),
    products_id INTEGER REFERENCES products(id),
    quantity INTEGER
  );

  CREATE TABLE product_tags(
    id INTEGER REFERENCES products(id),
    name VARCHAR(100)
  )
  `;
  
  
  await client.query(SQL);
};

const syncAndSeed = async()=> {
  await syncTables();
  const [moe, lucy]  = await Promise.all([
    createUser({
      username: 'moe',
      password: 'moe_password'
    }),
    createUser({
      username: 'lucy',
      password: 'lucy_password'
    })
  ]);
  console.log('--- seeded users ---');
  console.log(moe);
  console.log(lucy);
};


module.exports = {
  syncAndSeed,
  createUser,
  authenticate,
  getUserByToken,
  client
};
