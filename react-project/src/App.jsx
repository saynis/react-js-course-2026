import Footer from "./components/Footer"
import Header from "./components/Header"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"



function App() {

 
  return (
    <div className="">

  <Header />

   <Routes>

    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />

  </Routes>
  

  <Footer />
    
    </div>
  )
}

export default App