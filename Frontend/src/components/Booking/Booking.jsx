import React, {useState, useContext,useEffect} from 'react'
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Booking = ({ tour, avgRating }) => {
const { price, reviews, title } = tour;
// console.log(title,'>>>>>>>>>>>>>>>>>>>>>>>>>>>');
const navigate =useNavigate();

const {user}=useContext(AuthContext);


const [booking,setBooking]=useState({
    userId: user && user._id,
    userEmail:user && user.email,
    tourName:title||title,
    fullName:'',
    phone:'',
    guestSize:1,
    bookAt:''
})
useEffect(() => {
  setBooking({...booking,tourName:title})
}, [title])

    const handleChange=e=>{
        setBooking(prev=>({ ...prev, [e.target.id]:e.target.value}))
    };

    const serviceFee=10;
    const totalAmount=Number(price) * Number(booking.guestSize)+ Number(serviceFee);

    //send data to the server
    const handleClick= async e=>{
        // console.log(booking);
        e.preventDefault();

        // console.log(booking);

        try {
            if(!user || user===undefined || user===null){
            return toast.error("Please Sign in ")
            } 

            const res=await fetch(`${BASE_URL}/booking`,{
                method:'post',
                headers:{
                    'content-type':'application/json',
                },
                credentials:'include',
                body:JSON.stringify(booking)
            });

            const result= await res.json();

            if(!res.ok){
                return toast.info("Please fill in all the fields")
            }
            navigate("/thank-you");

        } catch (error) {
           return toast.error(error.message)
        }
        
    }

    return (
    <div className="booking">
        <div className="booking__top d-flex align-items-center justify-content-between">
            <h3>${price} <span> /per person</span></h3>
            <span className='tour__rating d-flex align-items center'>
                <i class="ri-star-fill"></i>
                {avgRating === 0 ? null : avgRating}  ({reviews?.length})
            </span>
        </div>
        {/* ===========booking form============ */}
            <div className="booking__form">
                <h5>Information</h5>
                <Form className='booking__info-form' onSubmit={handleClick}>
                        <FormGroup>
                            <input type="text" placeholder='Full Name' id='fullName' required onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <input type="number" placeholder='Phone' id='phone' required onChange={handleChange} />
                        </FormGroup>

                        <FormGroup className='d-flex align-items-center gap-3'>
                            <input type="date" placeholder='' id='bookAt' required onChange={handleChange} />
                            <input type="number" placeholder='No. of People' id='guestSize' required onChange={handleChange} />
                        </FormGroup>
                </Form>
            </div>
        {/* ===========booking form end ============ */}


        {/* ===========booking bottom  ============ */}
        <div className="booking__bottom">
            <ListGroup>
                <ListGroupItem className='border-0 px-0'>
                    <h5 className='d-flex align-items-center gap-1'> ${price} <i class="ri-close-fill"></i> 1 person</h5>
                    <span>${price}</span>
                </ListGroupItem>

                <ListGroupItem className='border-0 px-0'>
                    <h5> Service Charge</h5>
                    <span>${serviceFee}</span>
                </ListGroupItem>

                <ListGroupItem className='border-0 px-0 total'>
                    <h5>Total</h5>
                    <span>${totalAmount}</span>
                </ListGroupItem>
            </ListGroup>

            <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
        </div>

        {/* ===========booking bottom end ============ */}

            <ToastContainer/>
    </div>
    );
}

export default Booking