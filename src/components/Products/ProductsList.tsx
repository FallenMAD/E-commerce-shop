import { useEffect, useMemo, useState } from 'react';

import { Product } from './Product';

import { getCategories } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/index';
import { sortValues } from '../../constants';
import {
  getProducts,
  selectAllProducts,
  selectCategory,
  selectStatus,
  setCategory,
} from '../../features/ProductsSlice';
import { sortProducts } from '../../helper';
import { TSort } from '../../types';

export const ProductsList = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [sortType, setSortType] = useState<TSort>('all');

  const products = useAppSelector(selectAllProducts);
  const category = useAppSelector(selectCategory);
  const loading = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const newProducts = useMemo(() => {
    return sortProducts(products, sortType);
  }, [products, sortType]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as TSort);
  };

  const handleCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategory(e.target.value));
  };

  useEffect(() => {
    handleCategories();
  }, []);

  useEffect(() => {
    dispatch(getProducts(category));
  }, [category, dispatch]);

  return (
    <div className="products">
      <select onChange={handleCategoryChange}>
        <option value="all">all</option>
        {categories.map(category => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>

      <select onChange={handleSortChange}>
        {sortValues.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>

      <ul className="products__list">
        {loading === 'loading' ? (
          <p>Loading...</p>
        ) : (
          newProducts.map(product => (
            <Product product={product} key={product.id} />
          ))
        )}
      </ul>
    </div>
  );
};
