import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { shoppingAction } from './../store/index';

const CartButton = (props) => {
  const dispatchFn = useDispatch();

  const onToggleCart = () => {
    dispatchFn(shoppingAction.toggleCart());
  };
  return (
    <button className={classes.button} onClick={onToggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
