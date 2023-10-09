/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styles from './login.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser, setUserError } from '../../actions/user';
import { State } from '../../reducers';
import { useNavigate } from 'react-router-dom';

const Login: FunctionComponent = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: State) => state.user.user?.token);
  const error = useSelector((state: State) => state.user?.error);
  const loading = useSelector((state: State) => state.user?.loading);

  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token]);

  useEffect(() => {
    dispatch(setUserError(false));
  }, []);

  const isFormValid = () => {
    let valid = true;

    if (userName.length < 5) {
      setUsernameValid(false);
      valid = false;
    } else {
      setUsernameValid(true);
    }

    if (password.length < 6) {
      setPasswordValid(false);
      valid = false;
    } else {
      setPasswordValid(true);
    }

    return valid;
  };

  const login = () => {
    if (isFormValid()) {
      dispatch(loginUser(userName, password));
    }
  };

  const setValue = (e, setFn) => {
    const newVal = (e.target as HTMLInputElement).value;
    setFn(newVal);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your user name" value={userName} onChange={(e) => {setValue(e, setUsername)}} />
            { !userNameValid && <div className={styles.invalid}>Username should be at least 5 characthers</div> }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => {setValue(e, setPassword)}} />
            { !passwordValid && <div className={styles.invalid}>Password should be at least 6 characthers</div> }
          </Form.Group>
          <div className={styles.buttonsContainer}>
            <Button variant="dark" onClick={login} disabled={loading}>
              Login
            </Button>
            <Button variant="link" onClick={goToRegister}>
              Register
            </Button>
          </div>
          { error && <div className={styles.invalid}>Please enter correct username and password</div> }
        </Form>
      </div>
    </div>
  );
};

export default Login;
