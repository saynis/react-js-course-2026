

function ProductCard({products}) {
 
    if(products.length === 0){
        return <p>no products found</p>
    }

  return (
    <div>
        {products.map((product)=> (
            <li>{product.name} {product.price}</li>
        ))}
    </div>
  )
}

export default ProductCard