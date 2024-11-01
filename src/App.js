import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { shoppingAction } from './components/store/index';
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
    const sendCartData = async () => {
      dispatchFn(
        shoppingAction.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending Cart data',
        })
      );
      const response = await fetch(
        'https://redux-server-dce7e-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify(cartContent),
        }
      );

      if (!response.ok) {
        dispatchFn(
          shoppingAction.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending Cart Data failed',
          })
        );
      }

      dispatchFn(
        shoppingAction.showNotification({
          status: 'success',
          message: 'success',
          title: 'Sent cart data successful',
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatchFn(
        shoppingAction.showNotification({
          status: 'error',
          message: 'Error',
          title: 'Sending Cart data failed',
        })
      );
    });
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
