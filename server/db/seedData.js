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
        description VARCHAR(255),
        shipping VARCHAR(255),
        weight INTEGER,
        picture VARCHAR(100)
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
          //phone
           {name: 'iPhone 14',price: '799',description: 'The newest iphone on the market', shipping: 'free shipping', weight: '1', picture: 'url'},
           {name: 'iPhone 14 Pro',price: '999',description: 'The ultimate upgrade version of the iPhone 14', shipping: 'free shipping', weight: '1', picutre: 'url'},
           //keyboards
           {name: 'Apple Magic Keyboard with Numeric Keypad',price: '99',description: 'Wireless, Bluetooth, Rechargeable. Works with Mac, Ipad, or Iphone; US English-white', shipping: 'free shipping', weight: '5', picutre: 'url'},
           {name: 'White Wireless Full Size Keyboard',price: '40',description: 'Bluetooth Multi-Device USB Corldless Slim Quiet with Number Pad', shipping: 'free shipping', weight: '5', picutre: 'url'},
           //laptops
           {name: 'MacBook Pro 13',price: '1300',description: 'Apple M2 chip laptop', shipping: 'free shipping', weight: '3', picutre: 'url'},
           {name: 'MacBook Air 13',price: '1300',description: 'Apple M2 chip laptop', shipping: 'free shipping', weight: '3', picutre: 'url'},
           //computer mice
           {name: 'Bluetooth Mouse for Laptop',price: '20',description: 'Bluetooth Mouse for Laptop/iPad/iPhone/Mac/Android PC, Wireless, Slim USB, rechargable', shipping: 'free shipping', weight: '1', picutre: 'url'},
           {name: 'Logitech MX Master 3s for Mac',price: '100',description: 'Wireless Bluetooth Mouse with Ultra-Fast Scrolling, Ergo, 8k DPI, Quiet Clicks', shipping: 'free shipping', weight: '1', picutre: 'url'},
           //computers
           {name: 'Lenovo',price: '1000',description: 'Legion Tower 5i Gaming Desktop', shipping: 'free shipping', weight: '30', picutre: 'url'},
           {name: 'CyberPowerPC',price: '1200',description: 'Gamer Master Gaming Desktop', shipping: 'free shipping', weight: '30', picutre: 'url'},
           //monitors
           {name: '24 inch Monitor, Z-Edge Computer Monitor',price: '500',description: '24 inch Monitor, Z-Edge Computer Monitor, Full HD 1920x1080p IPS Display 75Hz PC Monitor', shipping: 'free shipping', weight: '20', picutre: 'url'},
           {name: 'GTEK 24 Inch 75HZ Frameless Computer Monitor',price: '100',description: 'GTEK 24 Inch 75Hz Frameless Computer Monitor, FHD 1080p LED Display, LCD Screen', shipping: 'free shipping', weight: '20', picutre: 'url'},
           //T-shirts
           {name: 'Nike',price: '26',description: 'Casual Wear for men', shipping: 'free shipping', weight: '1', picutre: 'url'},
           {name: 'Nike',price: '23',description: 'Swoosh Air Metallic Graphic Tee for men', shipping: 'free shipping', weight: '2', picutre: 'url'},
           //Sweatshirts
           {name: 'Langwyqu',price: '35',description: 'Oversized Sweatshirt for women', shipping: 'free shipping', weight: '2', picutre: 'url'},
           {name: 'Hanes',price: '15',description: 'Sweatshirt, EcoSmart Fleece Hoodie, Cotton Blend for men', shipping: 'free shipping', weight: '3', picutre: 'url'},
           //Shoes
           {name: 'Nike Air Force 1',price: '100',description: 'Shoes for women', shipping: 'free shipping', weight: '3', picutre: 'url'},
           {name: 'Nike Blazer Mid 77',price: '105',description: 'Shoes for women with 6 different colors', shipping: 'free shipping', weight: '3', picutre: 'url'},
           //Pants
           {name: 'Match',price: '40',description: 'Wild Cargo Pants for men', shipping: 'free shipping', weight: '4', picutre: 'url'},
           {name: 'Amazon Essentials',price: '30',description: 'Classic-Fit Stretch Golf Pant for men', shipping: 'free shipping', weight: '5', picutre: 'url'},
           //Bags
           {name: 'Bethany Belt Bag',price: '195',description: 'Polished pebble leather belt bag for women', shipping: 'free shipping', weight: '8', picutre: 'url'},
           {name: 'Gotham Tall Tote In Signature leather',price: '500',description: 'Signature polished pebble leather handbag for women', shipping: 'free shipping', weight: '10', picutre: 'url'},
           //Hats
           {name: 'Under Armour',price: '20',description: 'Blitzing II Stretch Fit Hat for men', shipping: 'free shipping', weight: '1', picutre: 'url'},
           {name: 'Under Armour',price: '18',description: 'Heathered Blitzing 3.0 Cap for men', shipping: 'free shipping', weight: '1', picutre: 'url'},
           //Silverware
           {name: '40-piece silverware set',price: '21',description: '10 folks, 20 spoons, 10 knifes', shipping: 'free shipping', weight: '20', picutre: 'url'},
           {name: 'Mikasa Harmony 65 Piece Silverware Set',price: '138',description: '20 knifes, 20 folks, 25 spoons', shipping: 'free shipping', weight: '40', picutre: 'url'},
           //Pots and Pans
           {name: 'Gibson Westleton 2 Piece Cookware Set Black',price: '40',description: '2 sets of pans', shipping: 'free shipping', weight: '15', picutre: 'url'},
           {name: 'Gibson Home Reilly 4-Piece Non-Stick Carbon Steel Roaster Set',price: '40',description: 'A roaster set with cooking tools', shipping: 'free shipping', weight: '30', picutre: 'url'},
           //Dishware
           {name: 'Corelle Vitrelle 18-Piece service for 6 Dinnerware Set',price: '60',description: '9 bowls and 9 dishes', shipping: 'free shipping', weight: '30', picutre: 'url'},
           {name: 'LE TAUCI Dinnerware Sets 12 Piece',price: '200',description: '6 bowls and 6 dishes', shipping: 'free shipping', weight: '30', picutre: 'url'},
           //Gaming chairs
           {name: 'Bossin Gaming Chairs with Footrest',price: '140',description: '2022 Leather Game Chair for Adults', shipping: 'free shipping', weight: '80', picutre: 'url'},
           {name: 'Home Office High Back Swivel Lumbar Support Desk',price: '130',description: 'Computer Ergonomic Mesh Chair with Armrest, Black', shipping: 'free shipping', weight: '90', picutre: 'url'},
           //Real Estate
           {name: '3 bedrooms, 2 bathrooms',price: '500000',description: 'House for sale', shipping: 'free shipping', weight: '1', picutre: 'url'},
           {name: '5 bedrooms, 3 bathrooms',price: '900000',description: 'House for sale', shipping: 'free shipping', weight: '1', picutre: 'url'},
           //Pets
           {name: 'Posh Paws Large Pet Sotrage Bin',price: '15',description: 'Perfect Canvas Bin for Cat or Dog Toys', shipping: 'free shipping', weight: '10', picutre: 'url'},
           {name: 'MidWest Homes For Pets',price: '26',description: 'Spree Hard-Sided Pet Carrier', shipping: 'free shipping', weight: '9', picutre: 'url'},
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
        await createInitialProducts()
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
  