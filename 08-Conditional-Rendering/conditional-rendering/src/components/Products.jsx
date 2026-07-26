import ProductCard from "./ProductCard"


function Products() {


    const products = [
        // {name: "laptop", price: 1000},
        // {name: "mobile", price: 3000}
    ]

  return (
    <div>
     
       <ProductCard products={products} /> 
    </div>
  )
}

export default Products