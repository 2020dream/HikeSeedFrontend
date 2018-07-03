import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import axios from 'axios';

export default class Analytics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hikes: [],
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3000/hikes')
    .then((response) => {
      this.setState({
        hikes: response.data
      });
      console.log(this.state.hikes.length);
    })
    .catch((error) => {
      this.setState({
        message: error.message
      });
    });
  }

  calculateSeedCount = () => {
    let seedCount = 0;
    this.state.hikes.forEach((hike) => {
      seedCount += hike.seeds.length;
    });
    return seedCount;
  }

  calculateHikingDistance = () => {
    let totalDistance = 0;
    this.state.hikes.forEach((hike) => {
      totalDistance += hike.distance;
    })
    return totalDistance;
  }

  render() {
    return (
      <View>
        <Text>Total number of hikes: {this.state.hikes.length}</Text>
        <Text>Total number of seeds: {this.calculateSeedCount()}</Text>
        <Text>Total hiking distance: {this.calculateHikingDistance()} miles</Text>
      </View>
    );
  }

}
