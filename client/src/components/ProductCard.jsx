import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) {
    console.error('Error: Invalid product data', product);
    return <div>Error: Invalid product data</div>;
  }

  return (
    <div style={{ display: 'inline-block', margin: '8px', width: '300px' }}>
      <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ position: 'relative' }}>
          <img src={product.url} alt={product.title.longTitle} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />

          <p
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              color: 'white',
              margin: '0',
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            {product.title.shortTitle}
          </p>
        </div>
        <div style={{ padding: '8px' }}>
          <p style={{ margin: '0', textDecoration: 'line-through', color: 'gray' }}>
            MRP: ₹{product.price.mrp}
          </p>
          <p style={{ margin: '0' }}>Discount: {product.price.discount}</p>
          <p style={{ margin: '0' }}>
            Final Price: ₹{product.price.cost}
          </p>


          <p style={{ margin: '0' }}>Additional Discount: {product.discount}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
