import React, { useEffect, useState } from 'react';
import {
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from './home/Footer';
import ProductCard from './ProductCard';

const ProductDetail = () => {
    const { productId } = useParams();
    const [productDetail, setProductDetail] = useState(null);
    const [otherProducts, setOtherProducts] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const userId = user ? user._id : null;
    // console.log(userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/getproducts");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const foundProduct = data.find((product) => product._id === productId);

                if (!foundProduct) {
                    console.error(`Product with ID ${productId} not found`);
                    setProductDetail(null);
                    return;
                }

                setProductDetail(foundProduct);
                const filteredProducts = data.filter(product => product._id !== productId);
                setOtherProducts(filteredProducts);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [productId, user]);

    const handleAddToCart = async () => {
        if (!user) {
            console.error('User not available');

            return;
        }

        try {
            // console.log(userId, productDetail);

            const response = await fetch('http://localhost:8000/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productDetail,
                    quantity: 1,
                }),
            });

            if (response.ok) {
                // console.log('added to cart, Done');
            }

        } catch (error) {
            console.error(error, "this is the error");
        }
    }

    const handleBuyNow = () => {
        console.log('Buy Now clicked');
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: '30px' }}>
            <div style={{ marginTop: '16px', display: 'flex' }}>
                {productDetail ? (
                    <>
                        <CardMedia
                            component="img"
                            alt={productDetail.title.longTitle}
                            image={productDetail.url}
                            style={{ height: '300px', width: '300px' }}
                        />
                        <Card>
                            <CardContent>
                                <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                                    {productDetail.title.longTitle}
                                </Typography>
                                <Typography variant="subtitle1">{productDetail.description}</Typography>
                                <Typography variant="body2" style={{ fontWeight: 'bold', marginTop: '16px' }}>
                                    {`Price: ₹${productDetail.price.cost}`}
                                </Typography>
                                <Typography variant="body2">{`Discount: ${productDetail.discount}`}</Typography>
                                <Typography variant="body2">{`Quantity: ${productDetail.quantity}`}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        backgroundColor: '#FFA500',
                                        color: 'white',
                                        marginTop: '16px',
                                        marginRight: '14px',
                                    }}
                                    onClick={() => handleAddToCart()}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        backgroundColor: '#FFA500',
                                        color: 'white',
                                        marginTop: '16px',
                                        '&:hover': {
                                            backgroundColor: 'green',
                                            color: 'white',
                                            fontSize: '16px',
                                        },
                                    }}
                                    onClick={() => handleBuyNow()}
                                >
                                    Buy Now
                                </Button>
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <Typography variant="body1">Loading...</Typography>
                )}
            </div>
            <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginTop: '16px' }}>
                {otherProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
