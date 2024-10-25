import classes from './CartItem.module.css';
import { shoppingAction } from './../store/index';
import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item;

  const dispatchFn = useDispatch();

  const onQuantityIncrease = (state) => {
    dispatchFn(
      shoppingAction.addToCart({
        id,
        title,
        price,
      })
    );
  };

  const onQuantityDecrease = (state, action) => {
    dispatchFn(shoppingAction.removeFromCart(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>{price.toFixed(2)}/item</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={onQuantityDecrease}>-</button>
          <button onClick={onQuantityIncrease}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
