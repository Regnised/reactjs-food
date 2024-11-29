import { createContext, useReducer, useEffect, useState } from 'react';
import { fetchMeals } from '../http';

export const CartContext = createContext({
  items: [],
  cart: [],
  addItemToCart: () => {},
  onUpdateCartItemQuantity: () => {},
});

function shoppingCartReducer(state, action) {
  console.log(state);
  console.log(action);
  if (action.type === 'ADD_ITEM') {
    const updatedCart = [...state.cart];

    const existingCartItemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === action.payload.id
    );
    const existingCartItem = updatedCart[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedCart[existingCartItemIndex] = updatedItem;
    } else {
      const product = state.items.find(
        (product) => product.id === action.payload.id
      );
      updatedCart.push({
        id: action.payload.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        quantity: 1,
      });
    }

    return {
      ...state, // for complex objects
      cart: updatedCart,
    };
  } else if (action.type === 'UPDATE_ITEM') {
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      (item) => item.id === action.payload.id
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      cart: updatedCart,
    };
  } else if (action.type === 'INIT') {
    return {
      ...state,
      items: action.payload.items.map((item) => ({
        ...item,
        price: parseFloat(item.price),
      })),
    };
  }
  return state;
}

export default function CartContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    {
      items: [],
      cart: [],
    }
  );

  useEffect(() => {
    async function getMeals() {
      setIsLoading(true);
      const meals = await fetchMeals();
      setIsLoading(false);

      shoppingCartDispatch({
        type: 'INIT',
        payload: {
          items: meals,
        },
      });
    }

    getMeals();
  }, []);

  function handleAddItemToCart(id) {
    shoppingCartDispatch({ type: 'ADD_ITEM', payload: { id } });
  }

  function handleUpdateCartItemQuantity(id, amount) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',

      payload: {
        id,
        amount,
      },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    cart: shoppingCartState.cart,
    isLoading,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
