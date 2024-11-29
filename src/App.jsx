import Header from './components/Header';
import ProductList from './components/ProductList';
import CartContextProvider from './store/shopping-cart-context';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <CartContextProvider>
      <Header />
      <ProductList />
    </CartContextProvider>
  );
}

export default App;
