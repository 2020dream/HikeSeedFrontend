import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { MapView } from 'expo';

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
      markers: [],
    }
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
          <MapView.Marker
            key={1}
            coordinate={{latitude: 47.799699, longitude: -122.1775054}}
            title={"Start Here!"}
            description={"Hello world!"}
          />;
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
