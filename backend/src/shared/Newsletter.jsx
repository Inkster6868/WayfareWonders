import React,{useContext, useRef} from 'react';
import './newsletter.css'
import emailjs from '@emailjs/browser';
import { Container,Row,Col } from 'reactstrap';
import maleTourist from "../assets/images/male-tourist.png";  
import {AuthContext} from "../context/AuthContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





const Newsletter = () => {  
  const {user}=useContext(AuthContext);
  const a=useRef();

  const templateParams = {
    name: user!==null? user.username: "User"
  };


const sendEmail=(e)=>{
  // console.log("nside");
  toast.info("Please wait, while we confirm");
  emailjs.send('service_511w89k', 'template_m5rhqfx', templateParams,'369hgvCugLwIo9Twi')
    .then(function(response) {
      //  console.log('SUCCESS!', response.status, response.text);
       toast.success("Thank You for Subscribing");
    }, function(error) {
      //  console.log('FAILED...', error);
    });

    a.current.value=""
  }

  return <> 
  <section className='newsletter'>
    <Container>
      <Row>
        <Col  lg='6'>
        <div className="newsletter__content">
            <h2>Subscribe now to get useful traveling information.</h2>

            <div  name="user_email" className="newsletter__input">
            <input ref={a} type="email"  placeholder='Enter your email'/>
            <button   className="btn newsletter__btn" onClick={()=>sendEmail() }>Subscribe</button>
            </div>

          <p>
          Get the inside scoop on the latest news and trends. Subscribe to our newsletter today and stay ahead of the curve. Be the first to know about new developments in your field of interest and have access to exclusive insights
          </p>

        </div>
        </Col>
        <Col  lg='6'>
          <div className="newsletter__img">
            <img src={maleTourist} alt="" />
          </div>
        </Col>
      </Row>
    </Container>
    <ToastContainer/>
  </section>
  </>
}

export default Newsletter;