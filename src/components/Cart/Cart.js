import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartContents = useSelector(
    (state) => state.shoppingReducer.cartContent
  );

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartContents.map((cartItems) => (
          <CartItem
            key={cartItems.id}
            item={{
              id: cartItems.id,
              title: cartItems.name,
              price: cartItems.price,
              total: cartItems.totalPrice,
              quantity: cartItems.quantity,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
