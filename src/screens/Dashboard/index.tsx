import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../reducers';
import styles from './dashboard.module.scss';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

const Dashboard: FunctionComponent = () => {
  const navigate = useNavigate();
  const username = useSelector((state: State) => state.user.user?.username);
  const allowShare = useSelector((state: State) => state.user.user?.allow_share) === '1' ? true : false;

  const navigateTo = (path) => {
    if (allowShare) { 
      navigate(path);
    }
  };

  return (
   
    <div className={styles.wrapper}>
       {console.log(allowShare)}
      <h2>Welcome {username}</h2>
      <div className={styles.typeContainer}>
        <div onClick={() => {navigate('/expenses')}}>My Expenses</div>
        <div onClick={() => {navigate('/incomes')}}>My Incomes</div>
        <div 
          className={cn({[styles.disabled]: !allowShare})}
          onClick={() => { navigateTo('/searchexpense'); }}
        >Search Expense</div>
        <div 
          className={cn({[styles.disabled]: !allowShare})}
          onClick={() => { navigateTo('/searchincome'); }}
        >Search Income</div>
      </div>
    </div>
  );
};

export default Dashboard;
