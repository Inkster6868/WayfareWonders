import React from 'react'
import galleryImages from './galleryImages';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

/* Masonry lays out contents of varying dimensions as blocks of the same width and different height with configurable gapsz */
/* Masonry maintains a list of content blocks with a consistent width but different height. The contents are ordered by row. If a row is already filled with the specified number of columns, the next item starts another row, and it is added to the shortest column in order to optimize the use of space. */

const MasonryImagesGallery = () => {
    return (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
            <Masonry gutter='1rem'>
                {
                    galleryImages.map((item, index) => (
                        <img  className='masonry__img'
                        src={item} key={index} alt="" style={{ 'width': '100%', 'display': 'block', 'borderRadius': '10px' }} />
                    ))
                }
            </Masonry>
        </ResponsiveMasonry>
    )
}

export default MasonryImagesGallery