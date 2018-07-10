import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { Location, Permissions } from 'expo';
import axios from 'axios';

export default class Hike extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      distance: '',
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
        Actions.hikeDetails({hike: response.data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clearForm = () => {
    this.setState({
      name: '',
      distance: '',
      seedString: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>HIKE & SEED</Text>
        <Text style={styles.title}>Sow Seeds</Text>
        <Text style={styles.subtitle}>Hike Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
          />
        <Text style={styles.subtitle}>Distance (miles)</Text>
        <TextInput
          style={styles.input}
          onChangeText={(distance) => this.setState({distance})}
          value={this.state.distance}
          />
        <Text style={styles.subtitle}>Nicknames</Text>
        <Text style={styles.text}>(use ONLY ONE space as seperators)</Text>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  header: {
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
    color: 'orange',
    paddingBottom: 5,
    textAlign: 'center',
    backgroundColor: '#f0f2ef',
    width: '100%',
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
  },
  title: {
    ...Platform.select({
        ios: {
          fontFamily: 'Optima-Bold',
        },
        android: {
          fontFamily: 'sans-serif-medium',
        }
    }),
    fontSize: 25,
    color: '#468728',
    padding: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...Platform.select({
         ios: { fontFamily: 'Optima-Bold', },
         android: { fontFamily: 'sans-serif-medium' }
    }),
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
  },
  text: {
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif' }
    }),
    fontSize: 15,
    padding: 5,
    textAlign: 'center',
  },
  input: {
    borderColor: '#468728',
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif' }
    }),
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
