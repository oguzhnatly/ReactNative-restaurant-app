import React, { Component } from 'react';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning:', 'Setting', 'Failed', '']);
import Main from './components/MainComponent';

export default class App extends Component {
  render() {
    return (
      <Main />
    );
  }
}
// javascript array operations in react native