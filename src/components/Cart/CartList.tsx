import { Cart } from './Cart';

import { useAppSelector } from '../../app/index';
import { selectCart } from '../../features/CartSlice';

export const CartList = () => {
  const cart = useAppSelector(selectCart);

  const totalPrice = cart
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div>
      <h3>Total Price ${totalPrice}</h3>
      <ul className="products__list">
        {cart.map(item => (
          <Cart key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
