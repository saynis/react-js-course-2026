import { useEffect, useState } from "react"
import Products from "./components/Products"


function App() {

  const [foods, setFoods] = useState([])
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState("")
  const [user , setUser] = useState("")

  useEffect(()=>{

    const getFoods = async()=>{

      try {
        let response = await fetch("https://saynis.store/api/foods")
         
        if(!response.ok){
           throw new Error("products not found")
        }

        let data = await response.json()
        setFoods(data)
        setLoading(false)

      } catch (error) {
       setError(error.message)
      }

    }
    
    getFoods()

  },[])






  return (
    <div>
      {user && <h1>Welcome {user}</h1>}
    
    <Products error={error} loading={loading} foods={foods} />
      
    </div>
  )
}

export default App