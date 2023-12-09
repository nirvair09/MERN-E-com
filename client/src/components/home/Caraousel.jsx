import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { bannerData } from '../../constants/data';
import { styled } from '@mui/material';

const MyCarousel = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };
    
    const Image = styled('img')(({ theme }) => ({
        width: '100%',
        height: 280,
        [theme.breakpoints.down('sm')]: {
            objectFit: 'cover',
            height: 180
        }
    }));

  return (
    <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            keyBoardControl={true}
            showDots={false}
            slidesToSlide={1}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {bannerData.map((item)=>(
                <Image key={item.id} src={item.url} alt="caraosel banner" />
            ))}
      
    </Carousel>
  );
};

export default MyCarousel;
