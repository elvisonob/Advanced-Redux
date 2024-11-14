import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { sendCartData, fetchRequest } from './components/store/index';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const notification = useSelector(
    (state) => state.shoppingReducer.notification
  );
  const cartIsVisible = useSelector((state) => state.shoppingReducer.cart);
  const cartContent = useSelector((state) => state.shoppingReducer.cartContent);
  const dispatchFn = useDispatch();

  useEffect(() => {
    dispatchFn(fetchRequest());
  }, [dispatchFn]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatchFn(sendCartData(cartContent));
  }, [cartContent, dispatchFn]);

  return (
    <Fragment>
      {notification && (
        <Notification
          title={notification.status}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
