import React, { useState,useContext } from 'react'
import {Container, Row, Col, Form, FormGroup, Button} from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Link, useNavigate} from "react-router-dom";
import "../styles/login.css";

import registerImg from "../assets/images/register.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from '../context/AuthContext';
import  {BASE_URL} from "../utils/config";



const Register = () => {
  
  const [credentials,setCredentials]=useState({
    userName:undefined,
    email:undefined,
    password:undefined,
})

    const navigate=useNavigate();
    const {dispatch}=useContext(AuthContext); /* now basically we will receive all the values given by AuthContext.provider */

    const handleChange=e=>{
    setCredentials(prev=>({ ...prev, [e.target.id]:e.target.value}))     /* for every field .id and .value will be respective of each other  */
};

const handleClick=async e=>{
      e.preventDefault()

      try {
        const res=await fetch(`${BASE_URL}/auth/register`,{
          method:'post',
          headers:{
            'content-type':'application/json'
          },
          
          body:JSON.stringify(credentials)  /* when we need to send data to server or receive data form server we stringify data from the object literal form to the JSON string form  */
        })   /* the response received from the backend */
        const result= await res.json();

        if(!res.ok) {
          toast(result.message)
        }

        else{
          await toast.success(result.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          }
        // navigate('/login');
        dispatch({type:"REGISTER_SUCCESS"});
        console.log(result.message);
        


      } catch (error) {
        toast(error.message);
      }
}


  return <section>
    <Container>
      <Row>
        <Col lg='8' className='m-auto'>
            <div className="login__container d-flex justify-content-between">
               <div className="login__img">
                <img src={registerImg} alt="" />
               </div>

               <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Register</h2>
              
                <Form onSubmit={handleClick}>  
                <FormGroup>
                    <input type="text" placeholder='Username' required id='username' onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="email" placeholder='Email' required  id='email' onChange={handleChange} />
                  </FormGroup>
                  <FormGroup>
                    <input type="password" placeholder='Password' required id='password' onChange={handleChange} />
                  </FormGroup>
                      <Button className='btn secondary__btn auth__btn' type='submit'>Create Account</Button>
                </Form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
               </div>
            </div>
        </Col>
      </Row>
    </Container>
    <ToastContainer/>
  </section>  
  
}

export default Register