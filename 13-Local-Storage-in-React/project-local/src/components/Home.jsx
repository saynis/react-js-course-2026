import { useState } from "react"


function Home() {

    const [addExpense, setAddexpenses] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        price: "",
        itemName: "",
        Category: ""
    })

     const [expenses , setExpenses] = useState([
        {id: 1, itemName: "busked", price: 200, Category: "cunto"}
     ])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e)=>{
       e.preventDefault()
      
       setExpenses([...expenses, formData])
       setAddexpenses(false)
       
    }

    return (
        <div className="max-w-[1140px] mx-auto">
            <div className="mt-8">
                <h1 className="font-bold text-2xl">expenses</h1>
                <div>
                    <ul>
                    {expenses.map((exp)=> (
                        <li className="py=6 bg-gray-300 rounded-md mb-4" >
                            <div className="flex justify-between p-6">
                              
                              <h1>{exp.itemName}, {exp.price}</h1>
                              
                              <div className="flex gap-4">
                                <button className="py-2 px-6 bg-blue-400 border-none rounded-md">delete</button>
                                <button className="py-2 px-6 bg-blue-400 border-none rounded-md">edit</button>
                              </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>


                <button
                    onClick={() => setAddexpenses(true)}
                    className="
           py-2 px-6 bg-blue-600 
           border-none rounded-md mt-8 ">Add expense</button>
            </div>

            {addExpense && (<div className=' fixed inset-0 bg-gray-600 bg-opacity-50
  flex justify-center items-center'>
                <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                    <form  onSubmit={handleSubmit}>


                        <div className="mb-4">

                            <input
                                type="number"
                                placeholder='id'
                                onChange={handleChange}
                                name='id'
                                className='w-full p-2 border rounded'
                                value={FormData.id}

                            />

                        </div>


                        <div className="mb-4">

                            <input
                                type="number"
                                name='price'
                                placeholder='Price'
                                onChange={handleChange}
                                className='w-full p-2 border rounded'
                                value={FormData.price}

                            />
                        </div>

                        <div className="mb-4">

                            <input
                                type="text"
                                placeholder='Name'
                                onChange={handleChange}
                                name='itemName'
                                className='w-full p-2 border rounded'
                                value={FormData.itemName}

                            />

                        </div>

                        <div className="mb-4">

                            <input
                                type="text"
                                placeholder='Category'
                                onChange={handleChange}
                                name='Category'
                                className='w-full p-2 border rounded'
                                value={FormData.Category}

                            />

                        </div>


                        <div className='flex gap-4'>





                            <button
                                type="submit"
                                className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
                            >
                                Add Expense
                            </button>

                            <button
                                //  onClick={()=> setAddExpense(false)}
                                className="w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            </div>
            )}
        </div>
    )
}

export default Home