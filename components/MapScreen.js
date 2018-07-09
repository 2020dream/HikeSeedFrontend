import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MapView } from 'expo';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { Location, Permissions } from 'expo';
import Moment from 'moment';

export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Default location is Bothell
      location: {
        latitude: 47.759953,
        longitude: -122.204483,
      },
      delta: {
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      hikes: [],
    }
  }

  componentDidMount = () => {
    this.getLocationAsync();
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

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    // Current Location is Ada in iOS simulator
    this.setState({
      location: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      }
    });
  }

  renderHikeMarkers = () => {
    const hikeMarkers = this.state.hikes.map((hike, index) => {
      return (
        <MapView.Marker
          key={index}
          coordinate={{latitude: parseFloat(hike.lat), longitude: parseFloat(hike.lon)}}
          title={hike.name}
          description={`Distance: ${hike.distance} miles, Date: ${Moment(hike.created_at).format('MM-DD-YYYY')}`}
          onCalloutPress={() => Actions.hikeDetails({hike: hike})}
        />
      );
    });
    return hikeMarkers;
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{...this.state.location, ...this.state.delta}}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {this.renderHikeMarkers()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
		height: '100%',
  }
});
