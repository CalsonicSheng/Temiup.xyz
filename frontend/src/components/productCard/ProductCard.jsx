import React from 'react';
import customStyle from './localStyle.module.css';

export default function ProductCard({ eachProduct }) {
  return (
    <div className={`${customStyle['product-card']}`}>
      <img src={eachProduct.path} alt="product-img" />
      <h4>{eachProduct.productName} </h4>
      <span>{eachProduct.type}</span>
      <span className={`${customStyle['overlay-span']}`}>{eachProduct.price}$</span>
    </div>
  );
}
