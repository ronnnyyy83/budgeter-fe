/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { State } from '../../reducers';
import styles from './searchincome.module.scss';

const SearchIncome: FunctionComponent = () => {
  const allowShare = useSelector((state: State) => state.user.user?.allow_share);
  const navigate = useNavigate();

  useEffect(() => {
    if (allowShare === '0') {
      navigate('/dashboard');
    }
  }, [allowShare]);

  return (
    <div className={styles.wrapper}>
      Search Income
    </div>
  );
};

export default SearchIncome;
