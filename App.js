import React, { Component } from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react'
import { Loading } from './components/LoadingComponent';

import { AppRegistry } from 'react-native';
AppRegistry.registerComponent('main',() => App);

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting DrawerLayoutAndroid', 'Warning: componentWillReceiveProps', '']);

const { persistor, store } = ConfigureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate 
          loading={<Loading />}
          persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}