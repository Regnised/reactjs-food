import { useContext } from 'react';
import { CartContext } from '../store/shopping-cart-context';
import { useInput } from '../hooks/useInput';
import Input from './Input';

function isEmail(value) {
  return value.includes('@');
}

function isNotEmpty(value) {
  return value.trim() !== '';
}

function minLength(value, min) {
  return value.trim().length > min;
}

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const {
    value: fullName,
    handleInputChange: handleFullNameChange,
    hasError: fullNameHasError,
  } = useInput('', (value) => {
    return isNotEmpty(value);
  });
  const {
    value: email,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput('', (value) => {
    return isEmail(value) && isNotEmpty(value);
  });
  const {
    value: street,
    handleInputChange: handleStreetChange,
    hasError: streetHasError,
  } = useInput('', (value) => {
    return isNotEmpty(value) && minLength(value, 3);
  });
  const {
    value: postalCode,
    handleInputChange: handleCodeChange,
    handleInputBlur: handleCodeBlur,
    hasError: postalCodeHasError,
  } = useInput('', (value) => {
    return isNotEmpty(value) && minLength(value, 5);
  });
  const {
    value: city,
    handleInputChange: handleCityChange,
    handleInputBlur: handleCityBlur,
    hasError: cityHasError,
  } = useInput('', (value) => {
    return isNotEmpty(value) && minLength(value, 3);
  });

  const totalPrice = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  function handleFormSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return 'error';
    }
    console.log(email, password);
  }

  return (
    <div id="checkout">
      <div id="cart-total">
        <p>
          Total Amount: <strong>{formattedTotalPrice}</strong>
        </p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <Input
          label="Full Name"
          id="fullName"
          type="text"
          name="fullName"
          error={fullNameHasError && 'Please enter a valid full name'}
          value={fullName}
          onChange={handleFullNameChange}
        />{' '}
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          error={emailHasError && 'Please enter a valid email'}
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />{' '}
        <Input
          label="Street"
          id="street"
          type="text"
          name="street"
          error={streetHasError && 'Please enter a valid street name'}
          value={street}
          onChange={handleStreetChange}
        />
        <div>
          <Input
            label="Postal Code"
            id="postalCode"
            type="number"
            name="postalCode"
            error={postalCodeHasError && 'Please enter a valid Postal code'}
            value={postalCode}
            onChange={handleCodeChange}
            onBlur={handleCodeBlur}
          />
          <Input
            label="City"
            id="city"
            type="text"
            name="city"
            error={cityHasError && 'Please enter a valid city name'}
            value={city}
            onChange={handleCityChange}
            onBlur={handleCityBlur}
          />
        </div>
      </form>
    </div>
  );
}