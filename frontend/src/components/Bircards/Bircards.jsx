import React, { useState, useEffect } from 'react';
import './Bircards.css';
import { useCart } from 'context/CartContext';
import { toast } from 'react-toastify';

export default function BiryaniCard({
  title,
  description,
  image,
  badge,
  price,
  type,
  rating,
  showDescription = true,
  quantityControl = false,
  showVegIcon = false,
  showRating = false,
  showAddToCart = false,
}) {
  const { addToCart, getQuantity } = useCart();

  const cartQuantity = getQuantity(title);
  const [localQuantity, setLocalQuantity] = useState(cartQuantity || 0);

  useEffect(() => {
    setLocalQuantity(cartQuantity);
  }, [cartQuantity]);

  const increase = () => {
    const newQty = localQuantity + 1;
    setLocalQuantity(newQty);
  };

  const decrease = () => {
    if (localQuantity <= 0) return;
    const newQty = localQuantity - 1;
    setLocalQuantity(newQty);
  };

  const handleAdd = () => {
    if (localQuantity <= 0) {
      toast.error('Please select a quantity greater than 0');
      return;
    }
    addToCart({ title, price, image, quantity: localQuantity });
  };


  return (
    <div className="biryani-card">
      {badge && <div className="badge">{badge}</div>}
      <img src={image} alt={title} />
      <div className="card-content">
        <div className="card-header">
          <h3>{title}</h3>
          {showRating && <p className="rating">{'★'.repeat(Math.floor(rating))}</p>}
        </div>

        {showVegIcon && type && (
          <div
            className={`food-icon ${type === 'Veg' ? 'veg' : 'nonveg'}`}
            title={type === 'Veg' ? 'Veg' : 'Non-Veg'}
          ></div>
        )}

        {price && <p className="price">₹{price}</p>}

        <div className="cart">
          {quantityControl && (
            <div className="quantity-control">
              <button onClick={decrease}>-</button>
              <span>{localQuantity}</span>
              <button onClick={increase}>+</button>
            </div>
          )}

          {showAddToCart && (
            <button className="add-cart-btn" onClick={handleAdd}>
              Add to Cart
            </button>
          )}
        </div>

        {showDescription && <p className="description">{description}</p>}
      </div>
    </div>
  );
}

