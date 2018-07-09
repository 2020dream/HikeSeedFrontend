import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { Location, Permissions } from 'expo';
import axios from 'axios';

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

  addHikeData = () => {
    const newHike = this.state;
    axios.post('https://zc-hike-seed.herokuapp.com/hikes', newHike)
      .then((response) => {
        this.clearForm();
        Actions.hikeDetails({hike: newHike});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clearForm = () => {
    this.setState({
      name: '',
      distance: '',
      seeds: [],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SOW SEEDS</Text>
        <Text style={styles.text}>Hike Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          />
        <Text style={styles.text}>Distance (miles)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(distance) => this.setState({distance})}
          value={this.state.distance}
          />
        <Text style={styles.text}>Nicknames</Text>
        <Text style={styles.text}>(use ONLY ONE space as seperators)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(nicknames) => this.parseNicknames(nicknames)}
          />
        <Button
          style={styles.button}
          backgroundColor='#9143b7'
          title='SOW SEEDS'
          onPress={this.addHikeData}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 50,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  title: {
    ...Platform.select({
         ios: { fontFamily: 'Optima-Bold', },
         android: { fontFamily: 'sans-serif-medium' }
    }),
    fontSize: 25,
    color: 'green',
    paddingBottom: 15,
    textAlign: 'center',
    width: '100%',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderColor: 'orange',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
    padding: 5,
  },
  button: {
    width: 130,
    marginTop: 10,
  }
});
