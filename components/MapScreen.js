import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MapView } from 'expo';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export default class MapScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 47.799699,
        longitude: -122.1775054,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
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

  renderHikeMarkers = () => {
    const hikeMarkers = this.state.hikes.map((hike, index) => {
      return (
        <MapView.Marker
          key={index}
          coordinate={{latitude: parseFloat(hike.lat), longitude: parseFloat(hike.lon)}}
          title={hike.name}
          onPress={() => Actions.hikeDetails({hike: hike})}
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
          region={this.state.region}
          showsUserLocation
          showsMyLocationButton
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
