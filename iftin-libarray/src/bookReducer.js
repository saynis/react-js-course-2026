export const intialData = {
    books:[],
    // total: 0
  
}


// function reducer
const bookReducer = (state, action)=>{
 
    const {type, payload} = action

    switch(type){
        case "ADD_TO_CART" : 
        return{
            ...state,
            books: payload.books
        }

        case "REMOVE_CART" : 
        return{
            ...state,
            books: payload.books
        }


        default: 
        throw new Error("invailed reducer")
    }


}


export default bookReducer