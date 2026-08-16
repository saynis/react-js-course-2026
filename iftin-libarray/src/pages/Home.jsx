import Icons from "../components/home/Icons"
import Ready from "../components/home/Ready"


function Home() {
  return (
    <div className="py-26">
    

    {/* hero section */}
    <section className="md:flex-row flex  flex-col-reverse  items-center md:px-16 px-1 justify-between py-8">

      {/* content */}
      <div className="md:w-1/2 w-full ">
        <h1 className="font-bold md:text-3xl text-2xl capitalize mb-4">Welcome to JigJiga Libarray</h1>
        <p className="md:text-lg text-md text-gray-700 capitalize mb-4">jigjiga libararry is a 
          place where you can find all the books
          you need for your study and research. 
          We have a wide range of books in different fields,
           including science, technology, engineering, and mathematics.
            Our library is open to all students and researchers 
            who are looking for 
          quality resources to support their academic work.
          </p>

           <button className="py-2 px-8 bg-[#2A7EFF] rounded-md text-white">Learn more</button>
      </div>


      {/* sawir */}
      <div className="md:w-1/3 w-full">
        <img  className="w-[60%]" src="/librarry.png" alt="" />
      </div>

    </section>


    {/* tirooyinka */}
    <section 
    className="md:flex items-center md:gap-4  gap-12 space-y-8 justify-between px-32 mt-4">

      {/* books */}
     <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-2 text-gray-700">1500+</h2>
      <span className="text-gray-500 text-md">Books</span>
     </div>

     {/* users */}
      <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-2 text-gray-700">100</h2>
      <span className="text-md text-gray-500">Users</span>
     </div>

     {/* access */}
      <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-2 text-gray-700">24/8</h2>
      <span className="text-md text-gray-500">access</span>
     </div>

    </section>

    {/* icons */}
    <Icons />

    {/* call to action */}
    <Ready />

      </div>
  )
}

export default Home