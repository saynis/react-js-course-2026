

function Footer() {

  const newYear = new Date().getFullYear()
  console.log(newYear)
  return (
    <div className="text-center bg-[#E3DCC4] py-8 ">
       <p className="text-md text-gray-700">    &copy; {newYear}  jigjiga Librarry. All rights reserved.</p>
    </div>
  )
}

export default Footer