import React from 'react'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion'

const Contact = () => {
 
    const [_result, setResult] = React.useState("");

  const _onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "878255cf-9a28-4f0b-9018-8e82304a901e");//key
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      let data
      try {
        data = await response.json()
      } catch (err) {
        console.error('Failed parsing JSON from web3forms:', err)
        toast.error('Server returned an unexpected response.')
        setResult('')
        return
      }

      if (response.ok && data.success) {
        setResult("");
        toast.success("Message sent successfully!");
        event.target.reset();
      } else {
        console.log("Error", data);
        const message = data && data.message ? data.message : `Request failed with status ${response.status}`
        toast.error(message)
        setResult("")
      }
    } catch (networkErr) {
      console.error('Network error while submitting contact form:', networkErr)
      toast.error('Network error. Please try again later.')
      setResult("")
    }
  };

  return (
    <motion.div 
     initial={{opacity: 0, x: -200}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x: 0}}
      viewport={{once: true}}

    className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden'id='Contact'>
     <div className='text-center mb-10'>
        <h2 className='text-3xl sm:text-5xl font-bold text-gray-900 mb-4'>
          Contact<span className='text-blue-600'> Us</span>
        </h2>
      </div>
        <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>Ready to make a move? Let's Build Your Future Together</p>

    <form onSubmit={_onSubmit} className='max-w-2xl mx-auto text-gray-600 pt-8'>
        <div className='flex flex-wrap'>
            <div className='w-full md:w-1/2 text-left'>
                Your Name
            <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="text" name='Name' placeholder='Your Name' required/>
            </div>
            <div className='w-full md:w-1/2 text-left md:pl-4'>
                Your Email
            <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="email" name='Email' placeholder='Your Email' required/>
            </div>
        </div>
        <div className='my-6 text-left'>
          Message
           <textarea className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none' name='Message' placeholder='Your Message' required></textarea>
        </div>

        <button className='bg-blue-600 text-white py-2 px-12 mb-10 rounded'>{_result ? _result : "Send Message"}</button>
    </form>
    </motion.div>
  )
}

export default Contact