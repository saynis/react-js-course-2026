

function About() {
  return (
    <div className="py-28">

      <div className=" bg-[#E3DCC4] py-12  px-16">
        <p className="md:text-4xl text-2xl text-gray-500 font-bold">About  <span className="text-gray-700 capitalize">us</span> </p>
      </div>



      <div className="max-w-7xl mx-auto mt-8">


        <div className="md:flex-row flex  flex-col-reverse  md:gap-24 gap-8  px-4 md:px-0">


          {/* content */}
          <div className="md:w-1/2 w-full">
            <p className="leading-tight ">
              Jigjiga University is one of the public higher institutions that was founded in March 2007, along with the Second-Generation universities in Ethiopia. It is located in the emerging town of Jigjiga the capital city of Ethiopian Somali regional state, 635 kilometers away from Addis Ababa. <br /> <br /> The University officially started  its service with 712 students, 66 and 99 administrative in three faculties in 2007.

              In the recent years, the intake capacity is increasing from year to year. So currently, it has a total of 21,554 students studying in 57 various academic programs and 627 post-graduate students pursuing in six academic programs.
                <br /> <br /> These programs are operating under eight Colleges, three Schools and an Institute.

              To this effect, the university has shown much achievement in education, research and community service. Last year only, 1888 students are graduated from different discipline that are capable of playing a great role in the development of the country.

              <br /> <br /> In it is aim is conducting demand driven research and communicating relevant research output which are problem solving and result oriented. Most of these research focus in pastoral and agro- pastoral studies. The research output communication is one strategic objective that focuses on adoption and adaptation of locally relevant technology and its transferring and assessing the community awareness 
            </p>
  
          </div>


          {/* image */}
          <div className="md:w-1/2 w-full">
            <img src="/jigjiga-image.jpg" alt="" />
          </div>

        </div>


      </div>

    </div>
  )
}

export default About