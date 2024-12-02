import { useContext, useRef } from 'react';
import logo from '../assets/logo.jpg';
import { CartContext } from '../store/shopping-cart-context';
import CustomModal from './CartModal';
import Cart from './Cart';
import Checkout from './Checkout';

export default function Header() {
  const { cart } = useContext(CartContext);
  const modal = useRef();
  const checkoutModal = useRef();
  const successOrderModal = useRef();

  const cartQuantity = cart.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  function handleOpenCheckout() {
    modal.current.close();
    checkoutModal.current.open();
  }

  function handleSubmitOrder() {
    checkoutModal.current.close();
    successOrderModal.current.open();
  }

  let modalActions = <button className="text-button">Close</button>;
  const modalCheckoutActions = (
    <>
      <button className="text-button">Close</button>
      <button className="button" onClick={handleSubmitOrder}>
        Submit Order
      </button>
    </>
  );

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button className="text-button">Close</button>
        <button className="button" onClick={handleOpenCheckout}>
          Checkout
        </button>
      </>
    );
  }

  return (
    <>
      <CustomModal
        ref={successOrderModal}
        title="Thank you for your order!"
        actions={<button className="text-button">Close</button>}
      ></CustomModal>
      <CustomModal
        ref={checkoutModal}
        title="Checkout"
        actions={modalCheckoutActions}
      >
        <Checkout />
      </CustomModal>
      <CustomModal ref={modal} title="Your Cart" actions={modalActions}>
        <Cart />
      </CustomModal>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Food" />
          <h1>REACTFOOD</h1>
        </div>

        <p className="text-button" onClick={handleOpenCartClick}>
          Cart ({`${cart.length}`})
        </p>
      </header>
    </>
  );
}
