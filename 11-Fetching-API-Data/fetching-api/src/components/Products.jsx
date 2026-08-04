import ProductCard from "./ProductCard"


function Products({foods, loading, error }) {

     if(error){
        return <h1>{error}</h1>
     }

    if(loading){
        return <h1>foods loading .......</h1>
    }

  return (

    <div >
    {foods.map((food)=>(
        <div className="card-container">
        <ProductCard key={food.id} food={food} />
        </div>
    ))}
    </div>
  )
}

export default Products