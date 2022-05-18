import React from 'react';
import styles from './TopNav.module.css';
import { useNavigate } from 'react-router-dom';

function TopNav() {
  const navigate = useNavigate();
  const groupPage = () => {
    navigate('/group');
  }
  const homePage = () => {
    navigate('/');
  }
  const signup = () => {
    navigate('/sign');
  }

  return (
    <div className={styles['topNav']}>
      <div className={styles['left']}>
          <button className='button' onClick={homePage}>Personal Suggestion</button>
          <button className='button' onClick={groupPage}>Group Suggestion</button>
      </div>
      <div className={styles['right']}>
          <button className='button'>Login</button>
          <button className='button' onClick={signup}>Sign up</button>
      </div>
    </div>
  )
}

export default TopNav;
