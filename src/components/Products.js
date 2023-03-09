// import { fetchProducts } from "../fetch";

const Products = (props) => {
    
    const products=props.products


    return (
        <div>

        {
            products.map(product => {
                return (
                    <li key={product.id}>{product.name}</li>
                )
            })
        }
        </div>
    )
}

export default Products