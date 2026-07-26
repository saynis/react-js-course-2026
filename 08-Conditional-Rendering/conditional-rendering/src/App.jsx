import Products from "./components/Products"
import User from "./components/User"


function App() {

  const user = {
    name: "mahamed",
    email: "mahamed@gmail.com",
    age: 20,
    isLOggedin : true
  }




  return (
    <div>
      <User user={user} />
      <Products />
    </div>
  )
}

export default App