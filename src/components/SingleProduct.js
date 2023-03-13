import React from 'react';
import {fetchSingleView} from "../fetch";

const SingleProduct = (props) => {
    const products = props.products;

    return (
        <div>
            {
                products.map(product => {
        return (
            <div>
            <div>{product.name}</div>
            <div>Price: ${product.price}</div>
            <div>Description: {product.description}</div>
            <div>Shipping: {product.shipping}</div>
            <div>Weight: {product.weight}lb</div>
            <div>Picture: {product.picture}</div>
            </div>
        )
                })
            
            }
        </div>
    )
}

export default SingleProduct;