import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../app/index';
import { routes } from '../../constants';
import { selectQuantity } from '../../features/CartSlice';

export const Header = () => {
  const quantity = useAppSelector(selectQuantity);
  return (
    <nav className="nav">
      <ul className="nav__list">
        {routes.map(({ to, label }) => (
          <li key={to} className="nav__item">
            <NavLink
              className={({ isActive }) => (isActive ? 'nav__active' : '')}
              to={to}
            >
              {label}
              {to === '/cart' && quantity > 0 && (
                <span className="nav__quantity">({quantity})</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
