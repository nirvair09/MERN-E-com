import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';

const ProductList = () => {
    const { searchTerm } = useParams();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/getproducts");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                const filteredProducts = searchTerm
                    ? data.filter((product) =>
                        product.title.longTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.title.shortTitle.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    : data;

                setProducts(filteredProducts);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [searchTerm]);

    return (
        <div>
            <h2>Product List</h2>
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default ProductList;
