import { useState } from 'react';

import cn from 'classnames';

import { useAppSelector } from '../../app/index';
import {
  frameSize,
  itemWidth,
  marginRight,
  minPosition,
} from '../../constants';
import {
  selectAllProducts, // selectCategory,
  selectError,
  selectStatus,
} from '../../features/ProductsSlice';
import { Product } from '../Products';

export const Carousel = () => {
  const [position, setPosition] = useState(0);

  const products = useAppSelector(selectAllProducts);
  // const category = useAppSelector(selectCategory);
  const error = useAppSelector(selectError);
  const loading = useAppSelector(selectStatus);

  const maxPosition = products.length - frameSize;

  const showNextPhone = () => {
    if (position + 1 < maxPosition) {
      setPosition(prev => prev + 1);
    } else {
      setPosition(maxPosition);
    }
  };

  const showPrevPhone = () => {
    if (position - 1 > minPosition) {
      setPosition(prev => prev - 1);
    } else {
      setPosition(minPosition);
    }
  };

  if (error) {
    return <p>Failed to Fetch</p>;
  }

  return (
    <div className="carousel">
      <h2>Carousel</h2>
      <div className="carousel__buttons">
        <button
          type="button"
          className={cn('carousel__button', {
            disabled: position === minPosition,
          })}
          onClick={showPrevPhone}
        >
          {'<'}
        </button>
        <button
          type="button"
          className={cn('carousel__button', {
            disabled: position === maxPosition,
          })}
          onClick={showNextPhone}
        >
          {'>'}
        </button>
      </div>
      <div>
        <ul className="carousel__slider">
          {loading === 'loading' ? (
            <p>Loading...</p>
          ) : (
            products.map(product => (
              <li
                key={product.id}
                className="carousel__item"
                style={{
                  transform: `translateX(${-(position * (itemWidth + marginRight))}px)`,
                }}
              >
                <Product key={product.id} product={product} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
