import React from 'react'
import TourCard from '../../shared/TourCard'
import { Col } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import { LoaderComponent } from '../../loader/Loader';


const FeaturedTourList = () => {          /* sending tour data object-wise to the tour card componenet */
const{data:featuredTours,Loading,error}=useFetch(`${BASE_URL}/tours/search/getFeaturedTours`); /* the useFetch hook that we created will be returning us 3things data, error,loading. so if we destructure the featuredTours using the "data:featuredTours" syntax from the given data object. featuredTours is just another name given to 'values' of the key 'data' */
// console.log(featuredTours);
  return<>
  {
    Loading && <LoaderComponent/>
  }
  {
    error && <h4>{error}</h4>
  }
    {  !Loading && !error &&                               
      featuredTours?.map(tour=>(                                
            <Col lg='3' md='6' sm='6'  className='mb-4' key={tour._id}><TourCard tour={tour} /></Col>
        ))
    }
  </>
}

export default FeaturedTourList