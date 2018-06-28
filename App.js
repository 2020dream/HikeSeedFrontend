import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import MapScreen from './components/MapScreen';
import ListScreen from './components/ListScreen';
import HikeDetailsScreen from './components/HikeDetailsScreen';
import SowSeedsScreen from './components/SowSeedsScreen';
import AnalyticsScreen from './components/AnalyticsScreen';

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' : 'black'}}>{title}</Text>
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="tabbar"
            tabs={true}
            tabBarStyle={{
              backgroundColor: '#000000',
            }}
          >
            <Scene
              key="map"
              component={MapScreen}
              title="Map"
              initial
              />
            <Scene
              key="list"
              component={ListScreen}
              title="List"
              />
            <Scene
              key="sowSeeds"
              component={SowSeedsScreen}
              title="Sow Seeds"
              />
            <Scene
              key="analytics"
              component={AnalyticsScreen}
              title="Analytics"
              />
          </Scene>
          <Scene
            key="hikeDetails"
            component={HikeDetailsScreen}
            title="Hike Details"
            />
        </Scene>
      </Router>
    );
  }
}
