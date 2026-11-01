

function Home() {
  return (
    <div className=" pt-16">

      <div className="flex justify-between items-center max-w-7xl mx-auto">

        {/* content */}
        <div className="w-1/2">
          <h5 className="text-xl text-[#c3c4c4]">AI & software company · Horn of Africa</h5>
          <h1 className="text-6xl font-bold mt-4">
            We build modern software <span className="text-[#6EE07F]">for African institutions.</span>
          </h1>

          <p className="mt-4 text-[#c3c4c4]">SAYNIS builds custom software and AI systems
            for governments, NGOs, hospitals, schools and businesses
            in Ethiopia and the Horn of Africa. You own everything
            we build.</p>

          <button className="mt-4 bg-[#6EE07F] py-2 px-6 border-none rounded-md">Start a project</button>

        </div>

        {/* sawir */}
        <div>
          <img
            className="w-96"
            src="/hero.jpg" alt="" srcset="" />
        </div>

      </div>

    </div>
  )
}

export default Home