import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  styled,
  Typography,
  Menu,
  MenuItem,
  Popover,
  Button,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/AccountCircle';
import SellerIcon from '@mui/icons-material/Storefront';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from './SearchBar';
import LoginSignUpDialog from './Login-SignUp/Login-SignUp-Dialog';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { removeFromCart } from '../actions/cartActions';

const StyledHeader = styled(AppBar)({
  backgroundColor: '#FEA33D',
  height: '70px',
});

const Logo = styled('img')({
  width: '80px',
  height: '80px',
  marginRight: '16px',
  objectFit: 'contain',
  cursor: 'pointer',
});

const CenteredBox = styled(Box)({
  display: 'flow',
  alignItems: 'center',
  flexGrow: 1,
});

const IconsWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

const Icon = styled(IconButton)({
  color: '#fff',
});

const Header = () => {
  const logo = 'logo-e-com.png';
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartAnchorEl, setCartAnchorEl] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleProfileClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyProfileClick = () => {
    handleMenuClose();
    navigate('/my-profile');
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    handleMenuClose();
  };

  const handleLogo = () => {
    navigate('/');
  };

  const handleSearch = (searchTerm) => {
    navigate(`/product/${searchTerm}`);
  };

  const handleCartClick = (event) => {
    navigate('/my-Cart');
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleBuyNow = () => {
    // Add your logic for "Buy Now" action
    console.log('Buy Now clicked');
  };

  return (
    <>
      <StyledHeader position="sticky">
        <Toolbar>
          <Logo src={logo} alt="logo" onClick={handleLogo} />
          <CenteredBox>
            <SearchBar onSearch={handleSearch} />
          </CenteredBox>
          <IconsWrapper>
            {!user ? (
              <Icon onClick={handleLoginClick}>
                <LoginIcon />
                <Typography>Login</Typography>
              </Icon>
            ) : (
              <>
                <Icon onClick={handleProfileClick}>
                  <LoginIcon />
                  <Typography>{user.username}</Typography>
                </Icon>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <Link to="/my-profile" style={{ textDecoration: 'none' }}>
                    <MenuItem onClick={handleMyProfileClick}>My Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={handleLogoutClick}>LogOut</MenuItem>
                </Menu>
              </>
            )}
            <Icon onClick={handleCartClick}>
              <ShoppingCartIcon />
              <Typography>Cart</Typography>
            </Icon>
            <Popover
              open={Boolean(cartAnchorEl)}
              anchorEl={cartAnchorEl}
              onClose={handleCartClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <Box p={2}>
                <Typography variant="h6">Your Cart</Typography>
                {cartProducts.map((product) => (
                  <div key={product.id}>
                    <Typography>{product.title}</Typography>
                    <Typography>Quantity: {product.quantity}</Typography>
                    {/* <Typography>Total Price: ${product.price.cost * product.quantity}</Typography> */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleRemoveFromCart(product.id)}
                    >
                      Remove
                    </Button>
                    <Divider style={{ margin: '16px 0' }} />
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </Box>
            </Popover>
            <Icon>
              <SellerIcon />
              <Typography>Become a seller</Typography>
            </Icon>
            <Icon>
              <MoreIcon />
            </Icon>
          </IconsWrapper>
        </Toolbar>
      </StyledHeader>
      <LoginSignUpDialog open={openDialog} onClose={handleCloseDialog} />
    </>
  );
};

export default Header;
