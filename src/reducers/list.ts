import { listActions } from './../actions/list';
import { AnyAction } from 'redux';

export interface ListState {
  cityCountry: any;
}

export const initListState: ListState = {
  cityCountry: null,
};

const listReducer = (state: ListState = initListState, action?: AnyAction): ListState => {
  switch (!!action && action.type) {
    case listActions.GET_CITY_COUNTRY_SUCCESS: {
      return {
        ...state,
        cityCountry: action.payload
      };
    }
    default:
      return state;
  }
};

export { listReducer };
