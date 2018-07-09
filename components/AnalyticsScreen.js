import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform
} from 'react-native';
import axios from 'axios';
import { BarChart, ContributionGraph } from 'react-native-chart-kit'
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(70, 135, 40, ${opacity})`,
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
      'Seed': 0,
      'Sprout': 0,
      'Leaf': 0,
      'Flower': 0,
      'Seeding': 0,
    }

    const today = new Date();

    this.state.hikes.forEach ((hike) => {
      const plantDate = new Date(hike.created_at);
      const age = Math.abs(today - plantDate) / 86400000;

      if (age <= 1) {
        plantDataHash['Seed'] += hike.seeds.length;
      } else if (age <= 3) {
        plantDataHash['Sprout'] += hike.seeds.length;
      } else if (age <= 13) {
        plantDataHash['Leaf'] += hike.seeds.length;
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
      <ScrollView contentContainerStyle={{flex:1}}>
        <View style={styles.container}>
          <Text style={styles.title}>ANALYTICS</Text>
          <View>
            <Text style={styles.subtitle}>Hiking Heatmap</Text>
            <Text style={styles.text}>Total Number of Hikes: {this.state.hikes.length}</Text>
            <Text style={styles.text}>Total Hiking Distance: {this.calculateHikingDistance()} miles</Text>
            <ContributionGraph
              values={this.parseHikingData()}
              endDate={new Date('2018-09-01')}
              numDays={100}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              />
          </View>
          <View>
            <Text style={styles.subtitle}>Plant Distribution</Text>
            <Text style={styles.text}>Total Number of Plants: {this.calculateSeedCount()}</Text>
            <BarChart
              data={this.parsePlantData()}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              style={styles.chart}
              />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
  title: {
    backgroundColor: '#fff',
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
    color: '#468728',
    paddingBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif' }
    }),
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif' }
    }),
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
  }
});
