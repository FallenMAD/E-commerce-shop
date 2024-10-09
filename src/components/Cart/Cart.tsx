import { FC } from 'react';

import { useAppDispatch } from '../../app/index';
import {
  decrementProductQauntity,
  incrementProductQauntity,
  removeProductFromCart,
} from '../../features/CartSlice';
import { ICart } from '../../types';

type CartProps = {
  item: ICart;
};

export const Cart: FC<CartProps> = ({ item }) => {
  const { image, title, price, quantity } = item;

  const newPrice = price * quantity;

  const dispatch = useAppDispatch();

  const handleIncrementQuantity = () => {
    dispatch(incrementProductQauntity(item.id));
  };

  const handleDecrementQuantity = () => {
    dispatch(decrementProductQauntity(item.id));
  };

  const handleRemoveCartProduct = () => {
    dispatch(removeProductFromCart(item.id));
  };

  return (
    <li className="card">
      <img className="card__img" src={image} alt="" />
      <div className="card__info">
        <div>
          <h3>{title}</h3>
          <p>${newPrice}</p>
        </div>

        <div className="card__button-wrapper">
          <button
            type="button"
            className="card__button-secodary"
            onClick={handleIncrementQuantity}
          >
            +
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            className="card__button-secodary"
            onClick={handleDecrementQuantity}
          >
            -
          </button>
        </div>
        <button
          type="button"
          className="card__button"
          onClick={handleRemoveCartProduct}
        >
          Remove Item
        </button>
      </div>
    </li>
  );
};
