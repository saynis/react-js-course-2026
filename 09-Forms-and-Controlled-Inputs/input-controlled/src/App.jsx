import { useState } from "react"


function App() {

  // const [username, setUserName] = useState("")
  // const [email, setEmail] = useState("")
  // const [age, setAge] = useState(0)


   const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: ""

  })


 



const handleChange = (e)=>{

    const {name, value} = e.target
     setFormData({  ...formData,   [name]: value})
}





const handleSubmit = (e)=>{
     e.preventDefault()

     console.log(formData)
}





  return (
    <div>

      <form  onSubmit={handleSubmit}>

        {/* username */}
        <input
          name="username"
          onChange={handleChange}
          type="text"
          placeholder="enter your username"
          value={formData.username}
        />

        <p>{formData.username}</p>


{/* email */}
        <input
        name="email"
          onChange={handleChange}
          type="email"
          value={formData.email}
          placeholder="enter your email" />


        <p>{formData.email}</p>


       {/* age */}
        <input
        name="age"
          value={formData.age}
          onChange={handleChange}
          type="number" placeholder="enter your age" />

        <p>{formData.age}</p>


        <button>register</button>
      </form>

    </div>
  )
}

export default App