const client = require("./client")

const {
    getUserByToken,
    createUser,
    authenticate
  } = require('./users');
  const {
    createProduct
  } = require('./Products');

async function dropTables() {
    // drop all tables, in the correct order
  try {
    console.log("Dropping All Tables...")
    
    await client.query(`
        DROP TABLE IF EXISTS product_tags;
        DROP TABLE IF EXISTS cart_products;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS users;
    `)
    console.log("Finished dropping tables")
  } catch (error) {
    console.error("error dropping tables")
    throw(error)
  }
}

async function createTables() {
    // create all tables, in the correct order
    try {
      console.log("Starting to build tables...")
      await client.query(`
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
        price INTEGER,
        description VARCHAR(255)
      );
    
      CREATE TABLE cart_products(
        id SERIAL PRIMARY KEY,
        cart_id INTEGER REFERENCES carts(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER
      );
    
      CREATE TABLE product_tags(
        id INTEGER REFERENCES products(id),
        name VARCHAR(100)
      );
      `)
      console.log("Finished building tables")
    } catch (error) {
      console.error("error constructing tables")
      throw(error)
    }
  }

  async function createInitialUsers() {
    try {
        const usersToCreate = [
            {username: 'moe',password: 'moe_password'},
          { username: "sandra", password: "sandra123" },
          { username: "glamgal", password: "glamgal123" },
        ]
        const users = await Promise.all(usersToCreate.map(createUser))
    
        console.log("Users created:")
        console.log(users)
        console.log("Finished creating users!")
      } catch (error) {
        console.error("Error creating users!")
        throw error
      }
  }

  async function createInitialProducts() {
    try {
        const productsToCreate = [
              {
                name: 'MacBook',
                price: '500',
                description: 'laptop'
              },
              {
                name: 'Airpods',
                price: '250',
                description: 'earbuds'
              },
              {
                name: 'AppleWatch',
                price: '350',
                description: 'electronic_watches'
              }
        ]
        const products = await Promise.all(productsToCreate.map(createProduct))

        console.log("products created:")
        console.log(products)

        console.log("Finished creating products.")
    } catch (error) {
        console.log("error creating products")
        throw error
    }
  }

  async function rebuildDB() {
    try {
        await dropTables()
        await createTables()
        await createInitialUsers()
        await createInitialUsers()
    } catch (error) {
        console.log("error during rebuildDB")
        throw error
    }
  }

  module.exports = {
    rebuildDB,
    dropTables,
    createTables,
  }
  