const client = require("./client")

const {
    getUserByToken,
    createUser,
    authenticate
  } = require('./users');
  const {
    createProduct
  } = require('./products');
const { createCart } = require('./cart')

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
        user_id INTEGER REFERENCES users(id) NOT NULL,
        is_active BOOLEAN DEFAULT true
      );
    
      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        price INTEGER,
        description VARCHAR(255),
        shipping VARCHAR(255),
        weight INTEGER,
        picture VARCHAR(255)
      );
    
      CREATE TABLE cart_products(
        id SERIAL PRIMARY KEY,
        cart_id INTEGER REFERENCES carts(id) NOT NULL,
        product_id INTEGER REFERENCES products(id) NOT NULL,
        quantity INTEGER DEFAULT 1
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
        
        const [moe, lucy, glam] = await Promise.all([
          createUser({username: 'moe',password: 'moe_password'}),
          createUser({ username: "sandra", password: "sandra123" }),
          createUser({ username: "glamgal", password: "glamgal123" })
        ])
    
        console.log("Users created:")
        console.log([moe,lucy,glam])
        console.log("Finished creating users!")

        const [moeCart, lucyCart, glamCart] = await Promise.all([
          createCart({ user_id: moe.id }),
          createCart({user_id: lucy.id}),
          createCart({user_id:glam.id})
        ])

        console.log("created carts")
      } catch (error) {
        console.error("Error creating users!")
        throw error
      }
  }

  async function createInitialProducts() {
    try {
        const productsToCreate = [
          //phone
           {name: 'iPhone 14',price: '799',description: 'The newest iphone on the market', shipping: 'free shipping', weight: '1', picture: 'https://imgs.search.brave.com/srsxayb1IGvz7F58fZ6sPtuW6kZXg5uhwRHlgrKJEuw/rs:fit:474:625:1/g:ce/aHR0cHM6Ly9zdGF0/aWMudG9paW1nLmNv/bS9waG90by84MDYz/NTMzNC9BcHBsZS1p/UGhvbmUtMTQtMTI4/R0ItNEdCLVJBTS5q/cGc'},
           {name: 'iPhone 14 Pro',price: '999',description: 'The ultimate upgrade version of the iPhone 14', shipping: 'free shipping', weight: '1', picture: 'https://imgs.search.brave.com/n4VqVRc7SxPr_lWIjg1bxEQHrpfZWnRdBYp5zs3ADxg/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5E/SFBGaE5fR1dMTXNR/Yk9uYlEyNTNBSGFI/YSZwaWQ9QXBp'},
           //keyboards
           {name: 'Apple Magic Keyboard with Numeric Keypad',price: '99',description: 'Wireless, Bluetooth, Rechargeable. Works with Mac, Ipad, or Iphone; US English-white', shipping: 'free shipping', weight: '5', picture: 'https://m.media-amazon.com/images/I/71Yt8j07LXL._AC_UY327_FMwebp_QL65_.jpg'},
           {name: 'White Wireless Full Size Keyboard',price: '40',description: 'Bluetooth Multi-Device USB Corldless Slim Quiet with Number Pad', shipping: 'free shipping', weight: '5', picture: 'https://m.media-amazon.com/images/I/61PNH6J1U6L._AC_UY327_FMwebp_QL65_.jpg'},
           //laptops
           {name: 'MacBook Pro 13',price: '1300',description: 'Apple M2 chip laptop', shipping: 'free shipping', weight: '3', picture: 'https://m.media-amazon.com/images/I/61lYIKPieDL._AC_UY327_FMwebp_QL65_.jpg'},
           {name: 'MacBook Air 13',price: '1300',description: 'Apple M2 chip laptop', shipping: 'free shipping', weight: '3', picture: 'https://m.media-amazon.com/images/I/61Dr0d29wjL._AC_UY327_FMwebp_QL65_.jpg'},
           //computer mice
           {name: 'Bluetooth Mouse for Laptop',price: '20',description: 'Bluetooth Mouse for Laptop/iPad/iPhone/Mac/Android PC, Wireless, Slim USB, rechargable', shipping: 'free shipping', weight: '1', picture: 'https://m.media-amazon.com/images/I/612hkjogX3S._AC_UY327_FMwebp_QL65_.jpg'},
           {name: 'Logitech MX Master 3s for Mac',price: '100',description: 'Wireless Bluetooth Mouse with Ultra-Fast Scrolling, Ergo, 8k DPI, Quiet Clicks', shipping: 'free shipping', weight: '1', picture: 'https://m.media-amazon.com/images/I/61TU7cMHepL._AC_UY327_FMwebp_QL65_.jpg'},
           //computers
           {name: 'Lenovo',price: '1000',description: 'Legion Tower 5i Gaming Desktop', shipping: 'free shipping', weight: '30', picture: 'https://m.media-amazon.com/images/I/617CPphv1DL._AC_UY327_FMwebp_QL65_.jpg'},
           {name: 'CyberPowerPC',price: '1200',description: 'Gamer Master Gaming Desktop', shipping: 'free shipping', weight: '30', picture: 'https://m.media-amazon.com/images/I/71FLsWWmE8L._AC_UY327_FMwebp_QL65_.jpg'},
           //monitors
           {name: '24 inch Monitor, Z-Edge Computer Monitor',price: '500',description: '24 inch Monitor, Z-Edge Computer Monitor, Full HD 1920x1080p IPS Display 75Hz PC Monitor', shipping: 'free shipping', weight: '20', picture: 'https://m.media-amazon.com/images/I/611Y7sey+mL._AC_UY327_FMwebp_QL65_.jpg'},
           {name: 'GTEK 24 Inch 75HZ Frameless Computer Monitor',price: '100',description: 'GTEK 24 Inch 75Hz Frameless Computer Monitor, FHD 1080p LED Display, LCD Screen', shipping: 'free shipping', weight: '20', picture: 'https://m.media-amazon.com/images/I/71ZZi5G0DwL._AC_UY327_FMwebp_QL65_.jpg'},
           //T-shirts
           {name: 'Nike',price: '26',description: 'Casual Wear for men', shipping: 'free shipping', weight: '1', picture: 'https://m.media-amazon.com/images/I/518xM0ElcnL._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Nike',price: '23',description: 'Swoosh Air Metallic Graphic Tee for men', shipping: 'free shipping', weight: '2', picture: 'https://m.media-amazon.com/images/I/51KiVU-89ZL._AC_UL480_FMwebp_QL65_.jpg'},
           //Sweatshirts
           {name: 'Langwyqu',price: '35',description: 'Oversized Sweatshirt for women', shipping: 'free shipping', weight: '2', picture: 'https://m.media-amazon.com/images/I/51cYVHP0faL._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Hanes',price: '15',description: 'Sweatshirt, EcoSmart Fleece Hoodie, Cotton Blend for men', shipping: 'free shipping', weight: '3', picture: 'https://m.media-amazon.com/images/I/71EJXo0WXiL._AC_UL480_FMwebp_QL65_.jpg'},
           //Shoes
           {name: 'Nike Air Force 1',price: '100',description: 'Shoes for women', shipping: 'free shipping', weight: '3', picture: 'https://m.media-amazon.com/images/I/61U3ompZL0L._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Nike Blazer Mid 77',price: '105',description: 'Shoes for women with 6 different colors', shipping: 'free shipping', weight: '3', picture: 'https://m.media-amazon.com/images/I/51LTqUtskBL._AC_UL480_FMwebp_QL65_.jpg'},
           //Pants
           {name: 'Match',price: '40',description: 'Wild Cargo Pants for men', shipping: 'free shipping', weight: '4', picture: 'https://m.media-amazon.com/images/I/51J8FQTuYmL._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Amazon Essentials',price: '30',description: 'Classic-Fit Stretch Golf Pant for men', shipping: 'free shipping', weight: '5', picture: 'https://m.media-amazon.com/images/I/71ypT0-ouSL._AC_UL480_FMwebp_QL65_.jpg'},
           //Bags
           {name: 'Bethany Belt Bag',price: '195',description: 'Polished pebble leather belt bag for women', shipping: 'free shipping', weight: '8', picture: 'https://m.media-amazon.com/images/I/41NnGiwiB7L._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Gotham Tall Tote In Signature leather',price: '500',description: 'Signature polished pebble leather handbag for women', shipping: 'free shipping', weight: '10', picture: 'https://m.media-amazon.com/images/I/71eXTO5gJ8L._AC_UL480_FMwebp_QL65_.jpg'},
           //Hats
           {name: 'Under Armour',price: '20',description: 'Blitzing II Stretch Fit Hat for men', shipping: 'free shipping', weight: '1', picture: 'https://m.media-amazon.com/images/I/81HZe5rdfIL._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Under Armour',price: '18',description: 'Heathered Blitzing 3.0 Cap for men', shipping: 'free shipping', weight: '1', picture: 'https://m.media-amazon.com/images/I/61QmA+fRAqL._AC_UL480_FMwebp_QL65_.jpg'},
           //Silverware
           {name: '40-piece silverware set',price: '21',description: '10 folks, 20 spoons, 10 knifes', shipping: 'free shipping', weight: '20', picture: 'https://m.media-amazon.com/images/I/718OY16srRS._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Mikasa Harmony 65 Piece Silverware Set',price: '138',description: '20 knifes, 20 folks, 25 spoons', shipping: 'free shipping', weight: '40', picture: 'https://m.media-amazon.com/images/I/51PiTsq3a0L._AC_UL480_FMwebp_QL65_.jpg'},
           //Pots and Pans
           {name: 'Gibson Westleton 2 Piece Cookware Set Black',price: '40',description: '2 sets of pans', shipping: 'free shipping', weight: '15', picture: 'https://m.media-amazon.com/images/I/61BatzR-xZL._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Gibson Home Reilly 4-Piece Non-Stick Carbon Steel Roaster Set',price: '40',description: 'A roaster set with cooking tools', shipping: 'free shipping', weight: '30', picture: 'https://m.media-amazon.com/images/I/81jZNuVLr7L._AC_UL480_FMwebp_QL65_.jpg'},
           //Dishware
           {name: 'Corelle Vitrelle 18-Piece service for 6 Dinnerware Set',price: '60',description: '9 bowls and 9 dishes', shipping: 'free shipping', weight: '30', picture: 'https://m.media-amazon.com/images/I/71zIvmHsGuL._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'LE TAUCI Dinnerware Sets 12 Piece',price: '200',description: '6 bowls and 6 dishes', shipping: 'free shipping', weight: '30', picture: 'https://m.media-amazon.com/images/I/51XuoZdhOGL._AC_UL480_FMwebp_QL65_.jpg'},
           //Gaming chairs
           {name: 'Bossin Gaming Chairs with Footrest',price: '140',description: '2022 Leather Game Chair for Adults', shipping: 'free shipping', weight: '80', picture: 'https://m.media-amazon.com/images/I/61Y-czu8iaL._AC_UL480_FMwebp_QL65_.jpg'},
           {name: 'Home Office High Back Swivel Lumbar Support Desk',price: '130',description: 'Computer Ergonomic Mesh Chair with Armrest, Black', shipping: 'free shipping', weight: '90', picture: 'https://m.media-amazon.com/images/I/61BIpHx0B3L._AC_UL480_FMwebp_QL65_.jpg'},
           //Real Estate
           {name: '3 bedrooms, 2 bathrooms',price: '500000',description: 'House for sale', shipping: 'free shipping', weight: '1', picture: 'https://m.media-amazon.com/images/I/81HtsEXbrpL._AC_UL480_FMwebp_QL65_.jpg'},
           {name: '5 bedrooms, 3 bathrooms',price: '900000',description: 'House for sale', shipping: 'free shipping', weight: '1', picture: 'https://m.media-amazon.com/images/I/61u4E3-fTbL._AC_UL480_FMwebp_QL65_.jpg'},
           //Pets
           {name: 'Posh Paws Large Pet Sotrage Bin',price: '15',description: 'Perfect Canvas Bin for Cat or Dog Toys', shipping: 'free shipping', weight: '10', picture: 'https://m.media-amazon.com/images/I/71GmJ29EwaL._AC_UY327_FMwebp_QL65_.jpg'},
           {name: 'MidWest Homes For Pets',price: '26',description: 'Spree Hard-Sided Pet Carrier', shipping: 'free shipping', weight: '9', picture: 'https://m.media-amazon.com/images/I/91MZDNLc9CL._AC_UY327_FMwebp_QL65_.jpg'},
        ]
        const products = await Promise.all(productsToCreate.map(createProduct))

        console.log("products created:")
        

        console.log("Finished creating products.")
    } catch (error) {
        console.log("error creating products")
        throw error
    }
  }

  async function createInitialCarts () {
    try {
      
    } catch (error) {
      
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
  