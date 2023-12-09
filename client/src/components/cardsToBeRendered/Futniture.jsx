import React from 'react';
import { furnitureData} from '../../constants/data';
import ProductCard from '../ProductCard';
import HorizontalScroll from '../HorizontalScroll';
import { Typography } from '@mui/material';

const Furniture = () => {
  return (
    <div style={{backgroundColor:"#ffd5b1",margin:"10px"}}>
      <Typography style={{ fontWeight: 'bold', fontSize: '1.5rem', paddingTop:"20px" , margin: '0 15px' }}>
        Furniture for Home Sweet Home ...
      </Typography>
      <HorizontalScroll>
        {furnitureData.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default Furniture;



