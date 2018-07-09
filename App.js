import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import MapScreen from './components/MapScreen';
import ListScreen from './components/ListScreen';
import HikeDetailsScreen from './components/HikeDetailsScreen';
import SowSeedsScreen from './components/SowSeedsScreen';
import AnalyticsScreen from './components/AnalyticsScreen';

class TabIcon extends React.Component {
  static propTypes = {
    iconName: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
        <Icon style={{color: 'orange'}} name={this.props.iconName || "circle"} size={25}/>
      </View>
    );
  }
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
              backgroundColor: '#ffffff',
            }}
          >
            <Scene
              key="map"
              title="Map"
              iconName="map"
              icon={TabIcon}
              hideNavBar={true}
              component={MapScreen}
              initial={true}
              />
            <Scene
              key="list"
              title="List"
              iconName="list"
              icon={TabIcon}
              hideNavBar={true}
              component={ListScreen}
              />
            <Scene
              key="sowSeeds"
              title="Sow Seeds"
              iconName="leaf"
              icon={TabIcon}
              hideNavBar={true}
              component={SowSeedsScreen}
              />
            <Scene
              key="analytics"
              title="Analytics"
              iconName="bar-chart"
              icon={TabIcon}
              hideNavBar={true}
              component={AnalyticsScreen}
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
