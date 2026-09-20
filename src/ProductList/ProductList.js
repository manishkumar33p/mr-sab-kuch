// src/components/ProductList.js
import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import products from 'D:/marv/src/Product/Product';

const ProductList = () => {
  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
