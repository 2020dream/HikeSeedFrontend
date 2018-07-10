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
        <Text style={styles.header}>HIKE & SEED</Text>
        <Text style={styles.title}>Hike List</Text>
        {this.renderHikeList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  header: {
    ...Platform.select({
        ios: {
          fontFamily: 'Optima-Bold',
          paddingTop: '15%',
        },
        android: {
          fontFamily: 'sans-serif-medium',
          paddingTop: '10%',
        }
    }),
    fontSize: 30,
    color: 'orange',
    paddingBottom: 5,
    textAlign: 'center',
    backgroundColor: '#f0f2ef',
    width: '100%',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    ...Platform.select({
        ios: {
          fontFamily: 'Optima-Bold',
        },
        android: {
          fontFamily: 'sans-serif-medium',
        }
    }),
    fontSize: 25,
    color: '#468728',
    padding: 10,
    textAlign: 'center',
  },
});
