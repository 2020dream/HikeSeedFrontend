import React from 'react';
import { View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import MapScreen from './components/MapScreen';
import ListScreen from './components/ListScreen';
import HikeDetailsScreen from './components/HikeDetailsScreen';
import AnalyticsScreen from './components/AnalyticsScreen';
import SowSeedsScreen from './components/SowSeedsScreen';

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
            tabBarPosition={'bottom'}
            tabBarStyle={{
              backgroundColor: '#f0f2ef',
              paddingTop: 35,
            }}
          >
          <Scene
            key="newHike"
            title="New Hike"
            iconName="leaf"
            icon={TabIcon}
            hideNavBar={true}
            component={SowSeedsScreen}
            initial={true}
            />
            <Scene
              key="map"
              title="Map"
              iconName="map"
              icon={TabIcon}
              hideNavBar={true}
              component={MapScreen}
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
            title="Hike Details"
            component={HikeDetailsScreen}
            />
        </Scene>
      </Router>
    );
  }
}
