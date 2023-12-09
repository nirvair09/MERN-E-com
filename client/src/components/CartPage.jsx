import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Button,
    Box,
    Card,
    CardMedia,
    CardContent,
    Divider,
} from '@mui/material';
import BuyNowButton from './buyNow/BuyNowButton';

const CartPage = () => {
    const [cartProduct, setCartProduct] = useState([]);
    const userToken = window.localStorage.getItem('token');
    const navigate = useNavigate();
    const handleToken = async (token) => {
        try {
            const response = await fetch('http://localhost:8000/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    token,
                    amount: calculateTotalPrice(),
                    cartProduct,
                }),
            });

            if (response.ok) {
                console.log('Payment successful!');
                await fetch('http://localhost:8000/clear-cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                    credentials: 'include',
                });
                navigate('/');
            } else {
                console.error('Error processing payment:', response.statusText);
                // Handle payment failure
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            // Handle payment failure
        }
    };

    const handleRemoveFromCart = async (productId) => {
        // console.log(productId)
        try {
            const response = await fetch('http://localhost:8000/remove-from-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    productId,
                }),
            });

            if (response.ok) {
                setCartProduct((prevCart) => prevCart.filter((item) => item.productId !== productId));
                // console.log(`Product ${productId} removed from cart`);
            } else {
                console.error('Error removing product from cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                const response = await fetch('http://localhost:8000/user-cart', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const cartData = await response.json();
                    setCartProduct(cartData);
                    // console.log('User cart:', cartData);
                } else {
                    console.error('Error fetching user cart:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user cart:', error);
            }
        };

        fetchUserCart();
    }, [userToken, handleRemoveFromCart]);


    const calculateTotalPrice = () => {
        return cartProduct.reduce((total, product) => total + product.product.price.mrp * product.quantity, 0);
    };

    return (
        <Box p={3}>
            <Typography style={{ textAlign: 'center', color: 'orange' }} variant="h3">Items in your Bag</Typography>
            {cartProduct.map((product) => (
                <Card key={product._id} style={{ marginBottom: '16px' }}>
                    <Box display="flex">
                        <CardMedia
                            component="img"
                            alt='image hai ji bass'
                            height="140"
                            image={product.product.url}
                            style={{ width: '200px', height: '200px', objectFit: 'contain', padding: '30px' }}
                        />
                        <CardContent>
                            <Typography variant="h5">{product.product.title.longTitle}</Typography>
                            <Typography variant="h6"> ₹ {product.product.price.mrp}</Typography>
                            <Typography>Quantity: {product.quantity}</Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleRemoveFromCart(product.product._id)}
                            >
                                Remove
                            </Button>
                        </CardContent>
                    </Box>
                </Card>
            ))}
            <Divider style={{ margin: '16px 0' }} />
            <Box display="flex" justifyContent="flex-end">
                <Typography variant='h5'>Your Total</Typography>
                <Typography variant="h6"> ₹ {calculateTotalPrice()}</Typography>
                <BuyNowButton amount={calculateTotalPrice()} handleToken={handleToken} />
            </Box>
        </Box>
    );
};

export default CartPage;
