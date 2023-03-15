import React from 'react';
// import { fetchProducts } from "../fetch";
import {Link} from "react-router-dom"
import { fetchAddProductToCart } from "../fetch"

const Products = ({ products }) => {
    
    return (
        <div>
        {
            products.map(product => {
                return (
                        <ul key={ product.id }>
                            <div className="product">
                                <div className="image">
                                    <li><img src={product.picture} alt="product_image" width='225px'height='275px'/></li>
                                </div>
                                <div className="info">
                                    <div className="info_sub1">
                                        <li className='name'>{product.name}</li>
                                        <li className='price'>${product.price}.00</li>
                                        <li className='shipping' key={product.id}>Shipping Details: {product.shipping}</li>
                                    </div>
                                </div>
                                <button
                                    onClick={async () => {
                                        const updatedCart = await fetchAddProductToCart(product.id)
                                        console.log('added to cart')
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </ul>
                )
            })
        }
        </div>
    )
}

export default Products
