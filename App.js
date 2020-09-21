import React, { Component } from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';

import { AppRegistry } from 'react-native';
AppRegistry.registerComponent('main',() => App);

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting DrawerLayoutAndroid', 'Warning: componentWillReceiveProps', '']);

const store = ConfigureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}