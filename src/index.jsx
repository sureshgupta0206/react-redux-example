import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './reducers';
import StartBook from './components/startBook';
import Center from 'react-center';

const store = createStore(combineReducers(reducers));

ReactDOM.render(
  (
    <Provider store={store}>
      <Center><StartBook /></Center>
    </Provider>
), document.getElementById('main'));
