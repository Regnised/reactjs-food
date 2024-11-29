import { useContext } from 'react';
import { CartContext } from '../store/shopping-cart-context';

export default function Cart() {
  const { cart, updateCartItemQuantity } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {cart.length === 0 && <p>No items in cart!</p>}
      {cart.length > 0 && (
        <ul>
          {cart.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li className="cart-item" key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateCartItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div id="cart-total">
        <p>
          Cart Total: <strong>{formattedTotalPrice}</strong>
        </p>
      </div>
    </div>
  );
}
