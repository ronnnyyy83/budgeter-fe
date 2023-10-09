import { AnyAction } from 'redux';
import { userActions } from '../actions/user';

export interface UserState {
  user: any;
  loading: boolean;
  error: boolean;
}

export const initUserState: UserState = {
  user: null,
  loading: false,
  error: false
};

const userReducer = (state: UserState = initUserState, action?: AnyAction): UserState => {
  switch (!!action && action.type) {
    case userActions.LOGIN_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case userActions.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        user: {...action.payload}
      };
    }
    case userActions.LOGIN_USER_FAILED: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case userActions.REGISTER_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case userActions.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        user: {...action.payload}
      };
    }
    case userActions.REGISTER_USER_FAILED: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    case userActions.SET_USER: {
      return {
        ...state,
       user: action.payload
      };
    }
    case userActions.SET_USER_ERROR: {
      return {
        ...state,
       error: action.payload
      };
    }
    default:
      return state;
  }
};

//export { userHasAccess, getCurrentUser } from '../utils/selectors/user/selectors';

export { userReducer };
