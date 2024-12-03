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

  async function handleSubmitOrder() {
    console.log(`Close form`);

    checkoutModal.current.close();

    successOrderModal.current.open();
    console.log(`open successsfull `);
  }

  function handleCloseModal(modal) {
    modal.current.close();
  }

  let modalActions = <button className="text-button">Close</button>;
  const modalCheckoutActions = (
    <>
      <button
        className="text-button"
        type="button"
        onClick={() => handleCloseModal(checkoutModal)}
      >
        Close
      </button>
      <button className="button">Submit Order</button>
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
      <CustomModal ref={checkoutModal} title="Checkout">
        <Checkout
          actions={modalCheckoutActions}
          handleSuccess={handleSubmitOrder}
        />
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
