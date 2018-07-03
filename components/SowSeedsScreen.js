import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { Location, Permissions } from 'expo';

export default class Hike extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      distance: '',
      seeds: [],
    };
  }

  parseNicknames = (nicknames) => {
    let seeds = [];
    let nameArray = nicknames.split(' ');
    nameArray.forEach((name) => {
      seeds.push({nickname: name})
    })
    this.setState({
      seeds,
    })
  }

  componentDidMount = () => {
    this.getLocationAsync();
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
      lat: currentLocation.coords.latitude,
      lon: currentLocation.coords.longitude,
    });
  }

  render() {
    return (
      <View>
        <FormLabel>Hike Name</FormLabel>
        <FormInput
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          />
        <FormLabel>Distance (miles)</FormLabel>
        <FormInput
          onChangeText={(distance) => this.setState({distance})}
          value={this.state.distance}
          />
        <FormLabel>Nicknames (use ONLY one space as seperators)</FormLabel>
        <FormInput
          onChangeText={(nicknames) => this.parseNicknames(nicknames)}
          />
        <Button
          title='SOW SEEDS'
          onPress={() => Actions.hikeDetails({hike: this.state})}
          />
      </View>
    );
  }

}
