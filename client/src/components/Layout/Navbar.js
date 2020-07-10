import React from 'react';
import styles from './Navbar.module.scss';

const Navbar = ({ setislogging, islogging, isloggedin, logout }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__logo}>
        <img
          src='logoIcon.svg'
          alt='Logo'
          className={styles.wrapper__logoImage}
        />
        <p>Scheduley</p>
      </div>
      {isloggedin ? (
        <p onClick={() => logout()}>Logout</p>
      ) : islogging ? (
        <p onClick={() => setislogging()}>Register</p>
      ) : (
        <p onClick={() => setislogging()}>Login</p>
      )}
    </div>
  );
};

export default Navbar;
