import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';
import App from './app';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from './reducers';
import { store } from './store';

import { NumberViewerContainer, NumberSetterContainer } from './pods/generate-number/components';

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </Provider>,
  document.getElementById('root')
);
