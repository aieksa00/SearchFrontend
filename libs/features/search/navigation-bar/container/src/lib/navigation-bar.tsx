import { SearchRoutes } from '@sep-frontend/models';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './navigation-bar.module.css';

/* eslint-disable-next-line */
export interface NavigationBarProps {}

export function NavigationBar(props: NavigationBarProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('jwt-token') ? true : false);
  }, [isLoggedIn, navigate]);

  const logout = () => {
    localStorage.clear();

    navigate(SearchRoutes.Login);
  };
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <button onClick={() => navigate(SearchRoutes.Home)}>doc.Search</button>
      </div>

      {!isLoggedIn && (
      <div className={styles.links}>
        <button onClick={() => navigate(SearchRoutes.Login)}>Log in</button>
        <button onClick={() => navigate(SearchRoutes.Register)}>Register</button>
      </div>
      )}
      
      {isLoggedIn && (
      <div className={styles.links}>
        <button onClick={() => navigate(SearchRoutes.Contracts)}>Contracts</button>
        <button onClick={() => navigate(SearchRoutes.Laws)}>Laws</button>
        <button onClick={() => logout()}>Log out</button>
      </div>
      )}
    </nav>
  );
}

export default NavigationBar;
