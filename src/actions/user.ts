export enum userActions {
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILED = 'LOGIN_USER_FAILED',
  REGISTER_USER = 'REGISTER_USER',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILED = 'REGISTER_USER_FAILED',
  SET_USER = 'SET_USER',
  SET_USER_ERROR = 'SET_USER_ERROR'
}

export const loginUser = (username: string, password: string) => ({
  type: userActions.LOGIN_USER,
  payload: {
    username,
    password
  }
});

export const loginUserSuccess = (user: any) => ({
  type: userActions.LOGIN_USER_SUCCESS,
  payload: user
});

export const loginUserFailed = () => ({
  type: userActions.LOGIN_USER_FAILED
});

export const registerUser = (username: string, password: string, city: string, country: string, allowShare: boolean) => ({
  type: userActions.REGISTER_USER,
  payload: {
    username,
    password,
    city,
    country,
    allowShare
  }
});

export const registerUserSuccess = (user: any) => ({
  type: userActions.REGISTER_USER_SUCCESS,
  payload: user
});

export const registerUserFailed = () => ({
  type: userActions.REGISTER_USER_FAILED
});

export const setUser = (user: any) => ({
  type: userActions.SET_USER,
  payload: user
});

export const setUserError = (error: boolean) => ({
  type: userActions.SET_USER_ERROR,
  payload: error
});