/* eslint-disable react-hooks/exhaustive-deps */
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import styles from './register.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getCityCountry } from '../../actions/list';
import { State } from '../../reducers';
import { registerUser, setUserError } from '../../actions/user';

const Register: FunctionComponent = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [userNameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [repasswordValid, setRepasswordValid] = useState(true);
  const [allowShare, setAllowShare] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: State) => state.user.user?.token);
  const error = useSelector((state: State) => state.user?.error);
  const loading = useSelector((state: State) => state.user?.loading);
  const cityCountry = useSelector((state: State) => state.list.cityCountry);

  useEffect(() => {
    dispatch(getCityCountry());
    dispatch(setUserError(false));
  }, []);

  useEffect(() => {
    if (token) {
      navigate('/dashboard')
    }
  }, [token]);

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

    if (repassword.length < 6  || password !== repassword) {
      setRepasswordValid(false);
      valid = false;
    } else {
      setRepasswordValid(true);
    }

    return valid;
  };

  const register = () => {
    if (isFormValid()) {
      dispatch(registerUser(userName, password, city, country, allowShare));
    }
  };

  const setValue = (e, setFn) => {
    const newVal = (e.target as HTMLInputElement).value;
    setFn(newVal);
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your user name" value={userName} onChange={(e) => {setValue(e, setUsername)}} />
            { !userNameValid && <div className={styles.invalid}>Username should be at least 5 characters</div> }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => {setValue(e, setPassword)}} />
            { !passwordValid && <div className={styles.invalid}>Password should be at least 6 characters</div> }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRePassword">
            <Form.Label>Re-Type Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" value={repassword} onChange={(e) => {setValue(e, setRepassword)}} />
            { !repasswordValid && <div className={styles.invalid}>Password should match</div> }
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select value={country} onChange={(e) => {setValue(e, setCountry)}}>
              <option value=''>Please select a country</option>
              {(cityCountry) && Object.keys(cityCountry).map((key, index) => {
                return <option key={`${index}_${key}` }>{key}</option>
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Select value={city} onChange={(e) => {setValue(e, setCity)}}>
              <option value=''>Please select a city</option>
              {(cityCountry && country) && Object.keys(cityCountry[country]).map((key, index) => {
                return <option key={`${index}_${key}` }>{cityCountry[country][key]}</option>
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Check
              checked={allowShare}
              type='checkbox'
              label='Allow Share Information'
              onChange={(e)=>{setAllowShare(e.target.checked)}}
            />
          </Form.Group>

          <div className={styles.buttonsContainer}>
            <Button variant="dark" onClick={register} disabled={loading}>
              Register
            </Button>
            <Button variant="link" onClick={goToLogin}>
              Login
            </Button>
          </div>
          { error && <div className={styles.invalid}>Please enter correct username and password</div> }
        </Form>
      </div>
    </div>
  );
};

export default Register;
