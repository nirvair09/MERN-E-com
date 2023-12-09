import React from 'react';
import { styled } from '@mui/system';

const ScrollContainer = styled('div')({
  display: 'flex',
  overflowX: 'auto',
  padding: '16px',
});

const HorizontalScroll = ({ children }) => {
  return <ScrollContainer>{children}</ScrollContainer>;
};

export default HorizontalScroll;