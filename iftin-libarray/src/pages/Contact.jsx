import Form from "../components/contact/Form"
import VirtualForm from "../components/contact/VirtualForm"


function Contact() {
  return (
    <div className="py-28">
     
     <div className="text-center bg-[#E3DCC4] py-16">
        
        <h2 className="md:text-4xl text-2xl text-[#2A7EFF] font-bold capitalize mb-8">Get in Touch</h2>
        <p className="text-lg md:text-xl text-gray-500 ">Jigjiga Library is a space dedicated to learning,  <br /> research, and community engagement. <br /> We’re here to support your educational journey,  <br /> and encourage the sharing of knowledge and ideas.</p>

     </div>


     <div className="max-w-7xl mx-auto mt-8">
   

     <div className="md:flex md:gap-24 gap-8">

          <Form />

          <VirtualForm />

     </div>

     </div>

    </div>
  )
}

export default Contact