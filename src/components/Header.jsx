import { useContext, useRef } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/shopping-cart-context';
import CartModal from './CartModal';

export default function Header() {
  const { cart } = useContext(CartContext);
  const modal = useRef();

  const cartQuantity = cart.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className="button">Close</button>
        <button className="button">Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Food" />
          <h1>REACTFOOD</h1>{' '}
        </div>

        <p className="text-button" onClick={handleOpenCartClick}>
          Cart({cart.length})
        </p>
      </header>
    </>
  );
}
