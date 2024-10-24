import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingAction } from './../store/index';

const CartButton = (props) => {
  const cartQuantity = useSelector(
    (state) => state.shoppingReducer.totalQuantity
  );

  const dispatchFn = useDispatch();

  const onToggleCart = () => {
    dispatchFn(shoppingAction.toggleCart());
  };
  return (
    <button className={classes.button} onClick={onToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
