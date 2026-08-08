import Header from "./components/Header"
import Footer from "./components/Footer"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import About from "./components/About"
import Contact from "./components/Contact"
import Products from "./components/Products"
import ProductDetail from "./components/ProductDetail"

function App() {
  return (
    <>

    <Header />
  


     <Routes>
      
      <Route path="/"   element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />


     </Routes>
    
    <Footer />
  
      
    </>
  )
}

export default App