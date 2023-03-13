// import { fetchProducts } from "../fetch";

const Products = (props) => {
    
    const products=props.products


    return (
        <div>

        {
            products.map(product => {
                return (
                    <div>
                        <li key={product.id}>{product.name}</li>
                    </div>
                )
            })
        }
        </div>
    )
}

export default Products