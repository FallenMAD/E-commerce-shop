import { useAppSelector } from '../app/index';
import { Carousel } from '../components';
import { selectError } from '../features/ProductsSlice';

export const Home = () => {
  const error = useAppSelector(selectError);

  if (error) {
    return <p>Failed to Fetch</p>;
  }

  return (
    <div>
      <Carousel />
    </div>
  );
};
