import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import axios from 'axios';
import { LineChart, ContributionGraph } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
};

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
    const hikingData = [
      { date: '2018-06-26', count: 12.3 },
      { date: '2018-07-05', count: 4.9 }
    ]

    const plantData = {
      labels: ['Sprout', 'Leaf', 'Flowerbud', 'Flower', 'Seeding'],
      datasets: [{
        data: [ 10, 0, 4, 0, 0 ]
      }]
    }

    return (
      <View>
        <ContributionGraph
          values={hikingData}
          endDate={new Date('2018-08-01')}
          numDays={100}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
      <LineChart
          data={plantData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
        <Text>Total number of hikes: {this.state.hikes.length}</Text>
        <Text>Total number of seeds: {this.calculateSeedCount()}</Text>
        <Text>Total hiking distance: {this.calculateHikingDistance()} miles</Text>
      </View>
    );
  }

}
