import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {
  const cartContent = useSelector((state) => state.shoppingReducer.cartContent);
  console.log(cartContent);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartContent.map((cartItems) => (
          <CartItem
            key={cartItems.itemId}
            id={cartItems.itemId}
            title={cartItems.name}
            description={cartItems.description}
            price={cartItems.price}
          />
        ))}
      </ul>
    </Card>
  );
};

//cartContent has the below

/*itemId: newItem.id,
name: newItem.name,
price: newItem.price,
totalPrice: newItem.price,
quantity: 1 */

export default Cart;
