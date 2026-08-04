
function ProductCard({food}) {
  return (

   
        <div className="card">
         <img  src={food?.image} alt="" srcset="" />
         <h1 className="heading">{food?.title}</h1>
         <p className="description">{food?.description}</p>

         <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo temporibus, reprehenderit debitis saepe cumque qui, modi quos nostrum voluptate ullam sint eligendi dolorum aperiam 
            minima. Quaerat architecto at cumque perferendis?
         </p>
        </div>
  
  )
}

export default ProductCard