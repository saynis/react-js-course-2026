import { useParams } from "react-router-dom"


function ProductDetail() {

    const {id} = useParams()
  return (
    <div>
        welcome product aad soo dooratay {id}
    </div>
  )
}

export default ProductDetail