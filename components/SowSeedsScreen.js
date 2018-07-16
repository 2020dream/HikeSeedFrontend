import React, { Component } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { Location, Permissions } from 'expo';
import axios from 'axios';
import Moment from 'moment';

import styles from '../Styles';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC_NNhhIaGqjr9Ca-08_m3hv21SsfRDQvg';
const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

export default class Hike extends Component {

  constructor(props) {
    super(props);

    this.state = {
      origin_lat: '',
      origin_lon: '',
      lat: '',
      lon: '',
      distance: '0',
      name: '',
      date: Moment(new Date()).format('MM-DD-YYYY'),
      seeds: [],
      seedString: '',
    };
  }

  parseNicknames = (nicknames) => {
    let seeds = [];
    let nameArray = nicknames.split(' ');
    let allowedNumber = parseInt(this.state.distance);

    if (allowedNumber > 0) {
      let allowedNameArray = nameArray.slice(0, allowedNumber);
      allowedNameArray.forEach((name) => {
        seeds.push({nickname: name})
      })
      this.setState({
        seeds,
        seedString: nicknames,
      })
    }
  }

  componentDidMount = () => {
    this.getLocationAsync();
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.changeLocation);
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    this.setState({
      current_lat: currentLocation.coords.latitude,
      current_lon: currentLocation.coords.longitude,
    });
  }

  changeLocation = (location) => {
    this.setState({
      current_lat: location.coords.latitude,
      current_lon: location.coords.longitude,
    });
  }

  setOriginLocation = () => {
    this.setState({
      origin_lat: this.state.current_lat,
      origin_lon: this.state.current_lon,
    });
    Alert.alert('You picked your start point!');
  }

  setDestinationLocation = () => {
    this.setState({
      lat: this.state.current_lat,
      lon: this.state.current_lon,
    }, () => this.getDistance());
    Alert.alert('You picked your end point!');
  }

  getDistance = () => {
    axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.origin_lat},${this.state.origin_lon}&destination=${this.state.lat},${this.state.lon}&key=${GOOGLE_MAPS_APIKEY}&mode=walking`)
      .then((response) => {
        const originDistance = response.data.routes[0].legs[0].distance.text.split(" ");
        let distance = 0;
        if (originDistance[1] === 'ft') {
          distance = Number((parseFloat(originDistance[0]) / 5280).toFixed(1));
          this.setState({
            distance,
          })
        } else {
          distance = Number((parseFloat(originDistance[0])).toFixed(1));
          this.setState({
            distance,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addHikeData = () => {
    const newHike = this.state;
    axios.post('https://zc-hike-seed.herokuapp.com/hikes', newHike)
      .then((response) => {
        this.clearForm();
        Actions.hikeDetails({hike: response.data});
        Alert.alert('You just created a new hike!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clearForm = () => {
    this.setState({
      name: '',
      distance: '0',
      seedString: '',
    });
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>HIKE & SEED</Text>
        <Text style={styles.title}>New Hike</Text>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            backgroundColor='#47bc4d'
            title='START'
            onPress={this.setOriginLocation}
            />
          <Button
            style={styles.button}
            backgroundColor='#f93e3e'
            title='END'
            onPress={this.setDestinationLocation}
            />
        </View>
        <Text style={styles.text}>Distance: {this.state.distance} miles</Text>
        <Text style={styles.subtitle}>Hike Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          />
        <Text style={styles.subtitle}>Nicknames</Text>
        <Text style={styles.note}>(use ONLY ONE space as seperators)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(nicknames) => this.parseNicknames(nicknames)}
          value={this.state.seedString}
          />
        <Button
          style={styles.button}
          backgroundColor='#683b23'
          title='SOW SEEDS'
          onPress={this.addHikeData}
          />
      </View>
    );
  }

}
