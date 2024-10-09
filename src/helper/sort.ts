import { IProduct } from '../types';
import { TSort } from '../types/TSort';

export const sortProducts = (products: IProduct[], sort: TSort) => {
  return [...products].sort((a, b) => {
    switch (sort) {
      case 'highest':
        return a.price - b.price;
      case 'lowest':
        return b.price - a.price;
      default:
        return 0;
    }
  });
};
