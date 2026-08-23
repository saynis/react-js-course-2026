import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
 import { ToastContainer, toast } from 'react-toastify';


function Addbook() {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        image: "",
        category: "",
        isbn: "",
        language: ""
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const response = await axios.post("https://jju.saynis.store/api/books", formData)

            if(response.status != 201){
                toast.error("feiled to create")
            }

            toast.success("book created seccessfuly")
            setFormData({
                title: "",
                author: "",
                description: "",
                image: "",
                category: "",
                isbn: "",
                language: ""
            })

           setTimeout(()=>{
                 navigate("/books")
           },2000)
        } catch (error) {
           toast.error(error.message)
        }

    }

    return (
        <div className="py-24">
            <ToastContainer />


            <div className="max-w-4xl mx-auto mt-4">

                <h2 className="md:text-4xl text-2xl mt-4 text-center text-blue-700 font-bold capitalize">Add new Book</h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg border border-gray-300 p-4 mt-8"
                    action="">

                    {/* title */}
                    <div className="flex flex-col mt-2 mb-2">
                        <label htmlFor="" className="md:text-3xl text-xl text-blue-700 font-bold mb-3 ">Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border border-blue-400 text-2xl outline-none text-gray-700 "
                            type="text" placeholder="Enter book title" />
                    </div>


                    {/* author */}
                    <div className="flex flex-col mt-2 mb-2">
                        <label htmlFor="" className="md:text-3xl text-xl text-blue-700 font-bold mb-3 ">Author</label>
                        <input
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border border-blue-400 text-2xl outline-none text-gray-700 "
                            type="text" placeholder="Enter book author" />
                    </div>


                    {/* description */}
                    <div className="flex flex-col mt-2 mb-2">
                        <label htmlFor="" className="md:text-3xl text-xl text-blue-700 font-bold mb-3 ">Description</label>
                        <input
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border border-blue-400 text-2xl outline-none text-gray-700 "
                            type="text" placeholder="Enter book description" />
                    </div>

                    {/* image */}
                    <div className="flex flex-col mt-2 mb-2">
                        <label htmlFor="" className="md:text-3xl text-xl text-blue-700 font-bold mb-3 ">image</label>
                        <input
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border border-blue-400 text-2xl outline-none text-gray-700 "
                            type="text" placeholder="Enter book image" />
                    </div>


                    {/* category */}
                    <div className="flex flex-col mt-2 mb-2">
                        <label htmlFor="" className="md:text-3xl text-xl text-blue-700 font-bold mb-3 ">Category</label>
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border border-blue-400 text-2xl outline-none text-gray-700 "
                            type="text" placeholder="Enter book category" />
                    </div>

                    {/* isbn */}
                    <div className="flex flex-col mt-2 mb-2">
                        <label htmlFor="" className="md:text-3xl text-xl text-blue-700 font-bold mb-3 ">isbn</label>
                        <input
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border border-blue-400 text-2xl outline-none text-gray-700 "
                            type="text" placeholder="Enter book isbn" />
                    </div>

                    {/* langauge */}
                    <div className="flex flex-col mt-2 mb-2">
                        <label htmlFor="" className="md:text-3xl text-xl text-blue-700 font-bold mb-3 ">Language</label>
                        <input
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full py-2 px-4 border border-blue-400 text-2xl outline-none text-gray-700 "
                            type="text" placeholder="Enter book langauge" />
                    </div>


                    <button
                        className="w-full mt-3 cursor-pointer py-2 bg-blue-700 border-none text-white rounded-md"
                        type="submit">Add book</button>

                </form>
            </div>

        </div>
    )
}

export default Addbook