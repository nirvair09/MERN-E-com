import React from 'react';
import { styled } from '@mui/system';
import { Container, Grid, Link, Typography } from '@mui/material';

const FooterContainer = styled('div')({
  backgroundColor: '#B6A79F',
  padding: '20px 0',
  marginTop: 'auto',
});

const FooterContent = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

const FooterColumn = styled('div')({
  marginRight: '20px',
});

const FooterHeading = styled('h4')({
  marginBottom: '10px',
  color: '#333',
});

const FooterLink = styled(Link)({
  display: 'block',
  color: '#555',
  textDecoration: 'none',
  marginBottom: '5px',
  '&:hover': {
    color: '#2874f0',
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterContent>
          <FooterColumn>
            <FooterHeading>Company</FooterHeading>
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Contact Us</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterHeading>Customer Service</FooterHeading>
            <FooterLink href="#">FAQs</FooterLink>
            <FooterLink href="#">Return Policy</FooterLink>
            <FooterLink href="#">Shipping</FooterLink>
          </FooterColumn>
          <FooterColumn>
            <FooterHeading>Connect With Us</FooterHeading>
            <FooterLink href="#">Facebook</FooterLink>
            <FooterLink href="#">Twitter</FooterLink>
            <FooterLink href="#">Instagram</FooterLink>
          </FooterColumn>
        </FooterContent>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          © {new Date().getFullYear()} Your E-Commerce Website by nirvair09. All rights reserved.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
