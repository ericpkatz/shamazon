import React from 'react';
import {fetchSingleView} from "../fetch";
import {useParams} from "react-router-dom";

const SingleProduct = () => {
    const id = useParams().id
    const product = fetchSingleView(id);
    

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
}

export default SingleProduct;