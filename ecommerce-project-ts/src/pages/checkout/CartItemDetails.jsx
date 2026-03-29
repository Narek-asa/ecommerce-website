import { formatMoney } from '../../utils/money.ts';
import { DeliveryOptions } from './DeliveryOptions.jsx';
import axios from 'axios';
import { useState } from 'react';
import { IMAGE_BASE } from '../../api/config.js';

export function CartItemDetails({ cartItem, deliveryOptions, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  const updateQuantity = async () => {
    if (isUpdatingQuantity) {
      await axios.put(`api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();

      setIsUpdatingQuantity(false);
    } else {
      setIsUpdatingQuantity(true);
    }
  };

  const changeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const keyDownUpdateQuantity = (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      updateQuantity();
    } else if (keyPressed === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  };

  return (
    <>
      <div className="cart-item-details-grid">
        <img
          className="product-image"
          src={`${IMAGE_BASE}/${cartItem.product.image}`}
        />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{'  '}
              {isUpdatingQuantity ? (
                <input
                  className="product-quantity-input"
                  type="text"
                  value={quantity}
                  onChange={changeQuantity}
                  onKeyDown={keyDownUpdateQuantity}
                />
              ) : (
                <span className="quantity-label">{cartItem.quantity} </span>
              )}
            </span>
            <div>
              <span
                className="update-quantity-link link-primary"
                onClick={updateQuantity}
              >
                Update
              </span>

              <span
                className="delete-quantity-link link-primary"
                onClick={deleteCartItem}
              >
                Delete
              </span>
            </div>
          </div>
        </div>

        <DeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          loadCart={loadCart}
        />
      </div>
    </>
  );
}
