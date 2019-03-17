import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import Nugu from './Nugu.js';

export default class App extends Component {
  render() {
    return (
      <LinearGradient colors={["#7DE2FC", "#B9B6E5"]} style={styles.container}>
        <StatusBar barStyle={"light-content"}/>
        <Nugu />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
