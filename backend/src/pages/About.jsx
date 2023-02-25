import React from 'react'

const About = () => {
  return (
    <> 
    <iframe style={{width:"100%", height:"300px", style:"border:0;" ,allowFullScreen:"" , title:'hello', referrerPolicy:"no-referrer-when-downgrade"}} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224567.66182403686!2d76.84965963398444!3d28.423187826785338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5fe8e5c64b1e!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1677186405822!5m2!1sen!2sin"></iframe>

    <h1  className='about' style={{marginLeft:50}}>The above given location on the map is not the exact location of the company!! Hope you Understand</h1>
    </>
    
  )
}

export default About