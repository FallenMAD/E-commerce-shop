import { useAppSelector } from '../app/index';
import { ProductsList } from '../components';
import { selectError } from '../features/ProductsSlice';

export const Products = () => {
  const error = useAppSelector(selectError);

  if (error) {
    return <p>Failed to Fetch</p>;
  }

  return <ProductsList />;
};
