import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import axios from 'axios';

import Hike from './Hike';

export default class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hikes: [],
    }
  }

  componentDidMount = () => {
    axios.get('https://zc-hike-seed.herokuapp.com/hikes')
    .then((response) => {
      this.setState({
        hikes: response.data
      });
    })
    .catch((error) => {
      this.setState({
        message: error.message
      });
    });
  }

  renderHikeList = () => {
    const hikeList = this.state.hikes.map((hike, index) => {
      return (
        <Hike
          key={index}
          hike={hike}
        />
      );
    });
    return hikeList;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>HIKE LIST</Text>
        {this.renderHikeList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    ...Platform.select({
         ios: { fontFamily: 'Optima-Bold', },
         android: { fontFamily: 'sans-serif-medium' }
    }),
    fontSize: 25,
    color: 'green',
    padding: 10,
  },
});
