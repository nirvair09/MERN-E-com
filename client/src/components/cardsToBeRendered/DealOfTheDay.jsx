import React from 'react';
import { dealData } from '../../constants/data';
import ProductCard from '../ProductCard';
import HorizontalScroll from '../HorizontalScroll';
import { Typography } from '@mui/material';

const DealOfTheDay = () => {
  return (
    <div style={{backgroundColor:"#ffd5b1",margin:"10px"}}>
      <Typography style={{ fontWeight: 'bold', fontSize: '1.5rem', paddingTop:"20px" , margin: '0 15px' }}>
        Deal of the Day !!
      </Typography>
      <HorizontalScroll>
        {dealData.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default DealOfTheDay;



