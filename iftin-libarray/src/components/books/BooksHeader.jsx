import { FaChartPie } from "react-icons/fa";
import { SiGamescience } from "react-icons/si";
import { TbAlphabetArabic } from "react-icons/tb";
import { TbMathSymbols } from "react-icons/tb";
import { RiEnglishInput } from "react-icons/ri";
import { FaBiohazard } from "react-icons/fa6";
import { SiGnusocial } from "react-icons/si";


function BooksHeader() {
  return (
    <div className="py-16">
   

    <header className="px-8 bg-white">

      <div  className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        
                {/* suugaanta */}
      <div className=' flex flex-col space-y-1 items-center'>
        <FaChartPie className='text-4xl text-blue-500 mr-2' />
        <span className='text-1xl capitalize font-semibold'>suugaanta</span>
        <span className='text-md text-gray-500 italic'>150 books</span>
      </div>

      {/* science */}
      <div className=' flex flex-col space-y-1 items-center'>
        <SiGamescience className='text-4xl text-[#E2DCC5] mr-2' />
        <span className='text-1xl capitalize font-semibold'>science</span>
        <span className='text-md text-gray-500 italic'>320 books</span>
      </div>

      {/* Arabic */}
      <div className=' flex flex-col space-y-1 items-center'>
        <TbAlphabetArabic className='text-4xl text-blue-500 mr-2' />
        <span className='text-1xl capitalize font-semibold'>Arabic</span>
        <span className='text-md text-gray-500 italic'>180 books</span>
      </div>

      {/* maths */}
      <div className=' flex flex-col space-y-1 items-center'>
        <TbMathSymbols className='text-4xl text-[#E2DCC5] mr-2' />
        <span className='text-1xl capitalize font-semibold'>maths</span>
        <span className='text-md text-gray-500 italic'>1360 books</span>
      </div>

      {/* English */}
      <div className=' flex flex-col space-y-1 items-center'>
        <RiEnglishInput className='text-4xl text-blue-500 mr-2' />
        <span className='text-1xl capitalize font-semibold'>English</span>
        <span className='text-md text-gray-500 italic'>1298 books</span>
      </div>

      {/* Biology */}
      <div className=' flex flex-col space-y-1 items-center'>
        <FaBiohazard className='text-4xl text-[#E2DCC5] mr-2' />
        <span className='text-1xl capitalize font-semibold'>Biology</span>
        <span className='text-md text-gray-500 italic'>897 books</span>
        </div>

      </div>

    </header>

    </div>
  )
}

export default BooksHeader