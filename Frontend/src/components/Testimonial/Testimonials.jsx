import React from 'react'
import Slider from 'react-slick';
import ava01 from '../../assets/images/ava-1.jpg'
import ava02 from '../../assets/images/ava-2.jpg'
import ava03 from '../../assets/images/ava-3.jpg'


const Testimonials = () => {
    const settings={
        dots:true,
        infinite:true,
        autoplay:true,
        speed:1000,
        swipeToSlide:true,
        autoplaySpeed:2000,
        slidesToShow:3,

        responsive:[
            {
                breakpoint:992,       /* Breakpoint means ki at these different values we will show accordingly , like the dots and slides according to the screen variations */
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true,
                    dots:true,
                },
            },
            {
                breakpoint: 576,
                settings:{
                    slidesToShow:1,
                    slidesToScroll:1,
                },
            },
        ]
    }
  return <Slider {...settings}>
    <div className="testimonial py-4 px-3">
        <p>
        I recently went on the city Bali tour and it was amazing! Our guide was knowledgeable and made the tour enjoyable with his sense of humor. The stops were well-planned and gave us a great overall understanding of the city's history and culture.
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava01}  className='w-25 h-25 rounded-2'  alt="" />
            <div>
                <h6 className='mb-0 mt-3'>John Doe</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p>
        I went on the Snowy Mountains tour and it was a truly unique and memorable experience. Our guide was experienced and provided us with a lot of information about the local flora and fauna. The hike was challenging but worth it for the stunning views at the top.
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava02}  className='w-25 h-25 rounded-2'  alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Lia Franklin</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p>
        I recently attended a cultural dance Paris tour and it was fantastic! The performances were engaging and the dancers were incredibly talented. Our guide was passionate about the culture and provided us with a lot of background information. 
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava03}  className='w-25 h-25 rounded-2'  alt="" />
            <div>
                <h6 className='mb-0 mt-3'>Michael watson</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>

    <div className="testimonial py-4 px-3">
        <p>
        "I had the opportunity to go on the historical monument tour and it was fantastic. Our guide was incredibly knowledgeable and made the tour both educational and entertaining. The monuments we visited were well-preserved and gave us a glimpse into the rich history of the area
        </p>

        <div className='d-flex align-items-center gap-4 mt-3'>
            <img src={ava03}  className='w-25 h-25 rounded-2'  alt="" />
            <div>
                <h6 className='mb-0 mt-3'>User 4</h6>
                <p>Customer</p>
            </div>
        </div>
    </div>
  </Slider>
}

export default Testimonials