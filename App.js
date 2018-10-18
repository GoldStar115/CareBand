/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react";
import { StyleSheet, View, YellowBox } from "react-native";

import MainNav from "./src/MainNav";
import { Provider } from "react-redux";
import store from "./src/reducer";

import aws_exports from './src/aws-exports'
import Amplify, { Storage } from 'aws-amplify'
Amplify.configure(aws_exports);
YellowBox.ignoreWarnings([
  "Warning: isMounted(...) is deprecated",
  "Module RCTImageLoader",
  "Class RCTCxxModule",
  "Warning: Can't call setState"
]);

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNav />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});
export default App
