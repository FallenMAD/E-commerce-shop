import { useEffect } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';

import { useAppDispatch } from './app/hooks';
import {
  getProducts,
} from './features/ProductsSlice/productsSlice';
import { Cart, Home, NotFound, Products, Root } from './pages';

const router = createHashRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
        {
          path: 'products',
          element: <Products />,
        },
        {
          path: 'cart',
          element: <Cart />,
        },
      ],
    },
  ],
  {
    basename: '/E-commerce-shop',
  },
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts('all'));
  }, [dispatch]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
