export enum listActions {
  GET_CITY_COUNTRY = 'GET_CITY_COUNTRY',
  GET_CITY_COUNTRY_SUCCESS = 'GET_CITY_COUNTRY_SUCCESS'
}

export const getCityCountry = () => ({
  type: listActions.GET_CITY_COUNTRY,
});

export const getCityCountrySuccess = (cityCountry: any) => ({
  type: listActions.GET_CITY_COUNTRY_SUCCESS,
  payload: cityCountry
});
