import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../app/index';
import { addProductToCart, selectCart } from '../../features/CartSlice';
import { ICart, IProduct } from '../../types';

type ProductProps = {
  product: IProduct;
};

export const Product: FC<ProductProps> = ({ product }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { image, title, price, category } = product;
  const cart = useAppSelector(selectCart);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const newProduct: ICart = {
      ...product,
      quantity: 1,
    };
    dispatch(addProductToCart(newProduct));
  };

  useEffect(() => {
    const isProductInCart = cart.some(item => item.id === product.id);
    setIsAddedToCart(isProductInCart);
  }, [cart, product.id]);

  return (
    <>
      <div className="card">
        <img className="card__img" src={image} alt="" />
        <div className="card__info">
          <h4 className="card__title">{title}</h4>
          <p>{category}</p>
          <p className="card__price">${price}</p>

          {isAddedToCart ? (
            <button type="button" className="card__button card__button--added">
              Added to cart
            </button>
          ) : (
            <button
              type="button"
              className="card__button"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          )}
        </div>
      </div>
    </>
  );
};
