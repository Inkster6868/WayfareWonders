import React, {useRef} from 'react'
import './search-bar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBar = () => {
const locationRef=useRef('');
const distanceRef=useRef(0);
const maxGroupSizeRef=useRef(0);
const navigate=useNavigate();

const searchHandler=async ()=>{
    const location=locationRef.current.value;
    const distance=distanceRef.current.value;
    const maxGroupSize=maxGroupSizeRef.current.value;

    if(location==='' || distance==='' || maxGroupSize===''){
        // return alert('All fields are required');
        return toast.warn('All fields are required', {
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

    const res=await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)

    if(!res.ok) alert('Something went wrong');

    const result = await res.json();

    /* navigating to  */
    navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,{state:result.data})   /* The React useNavigate hooks accept parameters as props in the state object. That means you can pass N number of props inside the state object. The props can be of any data type. toh ye data hum search list result ko bhej rhe hai  */ 
} 


  return <Col lg='12'>
    <div className="search__bar">
        <Form className='d-flex align-items-center gap-4'>
            <FormGroup className='d-flex gap-3 form__group form__group-fast '>
                <span><i class="ri-map-pin-line"></i></span>
                <div>
                    <h6>Location</h6>
                    <input type="text" placeholder="Where are you going?" ref={locationRef} />
                </div>
            </FormGroup>

            <FormGroup className='d-flex gap-3 form__group form__group-fast '>
                <span><i class="ri-map-pin-time-line"></i></span>
                <div>
                    <h6>Distance</h6>
                    <input type="number" placeholder="Distance K/M" ref={distanceRef} />
                </div>
            </FormGroup>

            <FormGroup className='d-flex gap-3 form__group form__group-last '>
                <span><i class="ri-group-line"></i></span>
                <div>
                    <h6>Max People</h6>
                    <input type="number" min={1} placeholder="0" ref={maxGroupSizeRef} />
                </div>
            </FormGroup>

            <span className="search__icon" type='submit' onClick={searchHandler}>
            <i class="ri-search-line"></i>
            </span>
        </Form>
    </div>
    <ToastContainer/> {/* react-toastify */}
  </Col>
  
}

export default SearchBar