import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from './header.module.scss';
import { State } from '../../reducers';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import { setUser } from '../../actions/user';

const Header: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: State) => state.user.user?.token) || localStorage.getItem('user');

  const logout = () => {
    dispatch(setUser(null));
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={() => {navigate('/dashboard')}} className={styles.logoContainer}>Budget<sup>er</sup></div>
      { token && <div className={styles.buttonContainer}><Button variant='link-white' onClick={logout}>Logout</Button></div> }
    </div>
  );
};

export default Header;
