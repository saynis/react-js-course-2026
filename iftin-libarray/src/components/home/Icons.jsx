import { GiMaterialsScience } from "react-icons/gi";
import { FaArtstation } from "react-icons/fa";
import { FaLaptop } from "react-icons/fa";
import { TbMathSymbols } from "react-icons/tb";

function Icons() {
    return (
        <div className="max-w-7xl mx-auto">

            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-8">
                {/* science */}
                <div className="shadow-md
                 bg-white rounded-md  border border-gray-300 text-center py-2">
                    <GiMaterialsScience  className="  md:text-7xl text-4xl mx-auto text-gray-700"/>
                    <h2 className="md:text-2xl text-md text-gray-700 font-bold">Science</h2>
                </div>

                {/* arts */}
                  <div className="shadow-md
                 bg-white rounded-md  border border-gray-300 text-center py-2">
                    <FaArtstation  className="md:text-7xl text-4xl mx-auto text-gray-700"/>
                    <h2 className="md:text-2xl text-md text-gray-700 font-bold">Arts</h2>
                </div>


                {/* technology */}
                    <div className="shadow-md
                 bg-white rounded-md  border border-gray-300 text-center py-2">
                    <FaLaptop  className="md:text-7xl text-4xl mx-auto text-gray-700"/>
                    <h2 className="md:text-2xl text-md text-gray-700 font-bold">Technology</h2>
                </div>

               
               {/* maths */}
                    <div className="shadow-md
                 bg-white rounded-md  border border-gray-300 text-center py-2">
                    <TbMathSymbols  className="md:text-7xl text-4xl mx-auto text-gray-700 "/>
                    <h2 className="md:text-2xl text-md text-gray-700 font-bold">Maths</h2>
                </div>
               

            </div>


        </div>
    )
}

export default Icons