import { Outlet } from 'react-router-dom';

import { Header } from '../components';

export const Root = () => {
  return (
    <div>
      <header className="header">
        <h1>Welcome to our shop</h1>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
