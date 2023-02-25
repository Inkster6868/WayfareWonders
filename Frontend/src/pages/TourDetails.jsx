import React, {useEffect, useRef,useState,useContext} from 'react'
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import avatar from "../assets/images/avatar.jpg";
import Booking from '../components/Booking/Booking';
import Newsletter from "../shared/Newsletter"
import useFetch from "./../hooks/useFetch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BASE_URL} from "../utils/config";
import {AuthContext} from "../context/AuthContext";
import { LoaderComponent } from '../loader/Loader';



const TourDetails = () => {
    const { id } = useParams();
    const reviewMsgRef=useRef('');
    const[tourRating,setTourRating]=useState(null)
    const {user}=useContext(AuthContext); 

    const {data:tour ,loading, error} = useFetch(`${BASE_URL}/tours/${id}`); 

    //destrcuture propertie form tour object
    const { photo, title, desc, price, address, reviews, city, distance, maxGroupSize } = tour;

    const {totalRating,avgRating}=calculateAvgRating(reviews);  /* destructred reviews above  */

    //format Date to be written next to reviews
    const options={day:'numeric',month:'long', year:'numeric'}


    //submit req to the server
    const submitHandler=async e=>{
        e.preventDefault()
        const reviewText=reviewMsgRef.current.value
        // alert(`${reviewText}, ${tourRating}`)

        try {

            if(!user || user===undefined || user===null){
                return toast.error("Please sign in")
            }

            const reviewObj={                              /* reviewObj will be the data that we will be sending to the backend n the reviewModal  */
                username:user.username, 
                reviewText,                        /* reviewText will be latest value in the review field that the user will enter  */
                rating:tourRating                  /* and tourRating will be the rating that the user selects while reviewing   */

            }
            const res=await fetch(`${BASE_URL}/review/${id}`,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                credentials:'include',
                body:JSON.stringify(reviewObj)
            })

            const result =await res.json();

            if(!res.ok) return toast.info(result.message);

            toast.info(result.message);

        } catch (error) {
                toast.error(error.message);
        }

    }

    useEffect(()=>{
            window.scrollTo(0,0)
    },[tour]);
    
    return <>
        <section>
            <Container>
            {
            loading  &&  <LoaderComponent/>
            }
            {
                error  && <h4 className='text-center pt-5' >{error}</h4>
            }
                {
                    !loading && !error && <Row>
                    <Col lg='8'>
                        <div className="tour__content">
                            <img src={photo} alt="" />
                            <div className="tour__info">
                                <h2>{title}</h2>
                                <div className='d-flex align-items-center gap-5'>
                                    <span className='tour__rating d-flex align-items center gap-1'>
                                        <i class="ri-star-fill"  style={{'color':'var(--secondary-color)'}}></i>
                                        {avgRating === 0 ? null : avgRating}
                                        {totalRating === 0 ? (
                                            'Not Rated') :
                                            (
                                                <span>{`(${reviews?.length})`}</span>
                                            )}
                                    </span>
                                                    <span>
                                                    <i class="ri-map-pin-user-fill"></i> {address}
                                                    </span>
                                </div>

                                <div className="tour__extra-details">
                                    <span><i class="ri-map-pin-2-line"></i> {city}</span>
                                    <span><i class="ri-money-dollar-circle-line"></i> ${price} /per person </span>
                                    <span><i class="ri-map-pin-2-line"></i> {distance} k/m </span>
                                    <span><i class="ri-group-line"></i> {maxGroupSize} people</span>
                                </div>
                                <h5>Description</h5>
                                <p>{desc}</p>
                            </div>
                            {/* =======tour review section starts============= */}

                            <div className="tour__reviews mt-4">
                                        <h4> Reviews ({reviews?.length} reviews)</h4>     {/* tells the no of reviews */}

                                        <Form onSubmit={submitHandler}>
                                            <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                                                <span onClick={()=> setTourRating(1)}>1 <i class="ri-star-s-fill"></i></span>
                                                <span onClick={()=> setTourRating(2)}>2 <i class="ri-star-s-fill"></i></span>
                                                <span onClick={()=> setTourRating(3)}>3 <i class="ri-star-s-fill"></i></span>
                                                <span onClick={()=> setTourRating(4)}>4 <i class="ri-star-s-fill"></i></span>
                                                <span onClick={()=> setTourRating(5)}>5 <i class="ri-star-s-fill"></i></span>
                                                {
                                                    tourRating!==null?
                                                    <span> Selected: {tourRating} <i class="ri-star-s-fill"></i></span>
                                                    :
                                                    <span className='not_selected'>Please select a Rating</span>
                                                }
                                            </div>

                                            <div className="review__input">
                                                <input type="text" ref={reviewMsgRef} required placeholder='share your thoughts'/>
                                                <button className="btn primary__btn text-white" type='submit'>
                                                    Submit
                                                </button>
                                            </div>
                                        </Form>

                                        <ListGroup className='user__reviews'>
                                                {
                                                    reviews?.map(review=>(
                                                        <div className="review__item">
                                                            <img src={avatar} alt="" />
                                                            <div className="w-100">
                                                                <div className='d-flex align-items-center justify-content-between'>
                                                                <div> 
                                                                    <h5>{review?.username}</h5>
                                                                    <p>{new Date(review.createdAt).toLocaleDateString('en-US', options)}
                                                                     </p>
                                                                </div>
                                                                <span className='d-flex align-items-center'>
                                                                    {review.rating} <i class="ri-star-s-fill"></i>
                                                                </span>
                                                            </div>
                                                            <h6>{review.reviewText}</h6>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                        </ListGroup>
                            </div>
                            {/* =======tour review section ends============= */}

                        </div>
                    </Col>

                    <Col lg='4'>
                        <Booking tour={tour} avgRating={avgRating} />
                    </Col>
                </Row>
                }
            </Container>
        </section>
        <Newsletter/>
        <ToastContainer/>
    </>

}

export default TourDetails