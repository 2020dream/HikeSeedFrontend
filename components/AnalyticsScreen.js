import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import axios from 'axios';
import { BarChart, ContributionGraph } from 'react-native-chart-kit'
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

  parseHikingData = () => {
    const hikingData = [];
    this.state.hikes.forEach ((hike) => {
      hikingData.push({ date: hike.created_at, count: hike.distance});
    })
    return hikingData;
  }

  parsePlantData = () => {
    const plantDataHash = {
      'Sprout': 0,
      'Leaf': 0,
      'Flowerbud': 0,
      'Flower': 0,
      'Seeding': 0,
    }

    const today = new Date();

    this.state.hikes.forEach ((hike) => {
      const plantDate = new Date(hike.created_at);
      const age = Math.abs(today - plantDate) / 86400000;

      if (age <= 2) {
        plantDataHash['Sprout'] += hike.seeds.length;
      } else if (age <= 7) {
        plantDataHash['Leaf'] += hike.seeds.length;
      } else if (age <= 13) {
        plantDataHash['Flowerbud'] += hike.seeds.length;
      } else if (age <= 16) {
        plantDataHash['Flower'] += hike.seeds.length;
      } else {
        plantDataHash['Seeding'] += hike.seeds.length;
      }
    })

    const hash_keys = [];
    const hash_values = [];

    for (let key in plantDataHash) {
      hash_keys.push(key);
      hash_values.push(plantDataHash[key]);
    }

    const plantData = {
      labels: hash_keys,
      datasets: [{
        data: hash_values
      }]
    }
    return plantData;
  }

  render() {
    return (
      <View>
        <Text>Total Number of Hikes: {this.state.hikes.length}</Text>
        <Text>Total Hiking Distance: {this.calculateHikingDistance()} miles</Text>
        <Text>Hiking Heatmap</Text>
        <ContributionGraph
          values={this.parseHikingData()}
          endDate={new Date('2018-08-01')}
          numDays={100}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
        />
        <Text>Total Number of Plants: {this.calculateSeedCount()}</Text>
        <Text>Plant Distribution</Text>
        <BarChart
            data={this.parsePlantData()}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
      </View>
    );
  }

}
