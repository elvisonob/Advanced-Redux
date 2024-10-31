import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const cartIsVisible = useSelector((state) => state.shoppingReducer.cart);
  const cartContent = useSelector((state) => state.shoppingReducer.cartContent);

  useEffect(() => {
    const sendCartData = async () => {
      const response = await fetch(
        'https://redux-server-dce7e-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cartContent),
        }
      );

      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
      const responseData = await response.json();
    };
  }, [cartContent]);
  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
