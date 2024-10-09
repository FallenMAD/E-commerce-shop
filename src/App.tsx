import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  getProducts,
  selectStatus,
} from './features/ProductsSlice/productsSlice';
import { Cart, Home, NotFound, Products, Root } from './pages';

const router = createBrowserRouter([
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
]);

function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts('all'));
    }
  }, [status, dispatch]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
