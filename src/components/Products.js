// import { fetchProducts } from "../fetch";
import {Link} from "react-router-dom"

const Products = (props) => {
    
    const products=props.products


    return (
        <div>
        {
            products.map(product => {
                return (
                    <ul className="product">
                        <li key={product.id}> <Link to={`/products/${product.id}`}>{product.name}</Link> </li>
                        <li key={product.id}>${product.price}.00</li>
                        <li key={product.id}>{product.description}</li>
                        <li key={product.id}>Shipping Details: {product.shipping}</li>

                    </ul>
                )
            })
        }
        </div>
    )
}

export default Products