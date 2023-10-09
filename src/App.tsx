import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import Router from './Router';
import { render } from 'react-dom';
import './app.scss';

const rootElement = document.getElementById('root');

async function App(): Promise<any> {
  render (
    <Provider store={store}>
      <Router />
    </Provider>,
    rootElement
  );
}

export default App;
