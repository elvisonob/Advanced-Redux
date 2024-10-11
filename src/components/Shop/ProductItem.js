import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { shoppingAction } from './../store/index';
import { useDispatch } from 'react-redux';

const ProductItem = (props) => {
  const dispatchFn = useDispatch();
  const { id, title, price, description } = props;

  const addToCart = () => {
    dispatchFn(
      shoppingAction.addToCart({
        id,
        title,
        description,
        price,
      })
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
