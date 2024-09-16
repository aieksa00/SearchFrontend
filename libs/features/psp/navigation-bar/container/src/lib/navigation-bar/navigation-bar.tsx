import { PSPRoutes } from '@sep-frontend/models';
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

    navigate(PSPRoutes.Home);
  };
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <button onClick={() => navigate(PSPRoutes.Home)}>ePay</button>
      </div>

      {!isLoggedIn && (
      <div className={styles.links}>
        <button onClick={() => navigate(PSPRoutes.Login)}>Login</button>
        <button onClick={() => navigate(PSPRoutes.Register)}>Register</button>
        <p>Secure</p>
        <p>Fast</p>
        <p>Easy</p>
      </div>
      )}
      
      {isLoggedIn && (
      <div className={styles.links}>
        <button onClick={() => navigate(PSPRoutes.ChangePaymentOptions)}>Change Payment Options</button>
        <button onClick={() => navigate(PSPRoutes.Transactions)}>Transactions</button>
        <button onClick={() => logout()}>Log out</button>
      </div>
      )}
    </nav>
  );
}

export default NavigationBar;
