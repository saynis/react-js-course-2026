import { Link } from "react-router-dom"


function Products() {
    const id = 3
  return (
    <div>
        <Link to={ `/products/${id}`} ><h1>Product one</h1></Link>
        <h1>Products two</h1>
        <h1>Product three</h1>
    </div>
  )
}

export default Products