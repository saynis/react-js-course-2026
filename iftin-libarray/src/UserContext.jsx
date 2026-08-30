import { createContext, useState } from "react";

export const UserContext = createContext()


 export const  AuthProvider = ({children})=>{

    console.log(children)
      const [user , setUser] = useState("mahamed")

      const [book, setBook] = useState({
        name: "sheeko iyo shaah",
        author: "subeer"
      })


      return(

        <UserContext.Provider value={{user, book}} >
          {children}
        </UserContext.Provider>

      )
}
 
