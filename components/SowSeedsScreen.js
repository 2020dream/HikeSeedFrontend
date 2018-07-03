import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, Button } from 'react-native-elements'

export default class Hike extends Component {

  constructor(props) {
    super(props);

    this.state = {
      location: '',
      distance: '',
      nicknames: [],
    };
  }

  parseNicknames = (nicknames) => {
    let nicknameArray = [];
    nicknameArray = nicknames.split(' ');
    this.setState({
      nicknames: nicknameArray,
    })
    console.log(this.state);
  }

  render() {
    return (
      <View>
        <FormLabel>Location</FormLabel>
        <FormInput
          onChangeText={(location) => this.setState({location})}
          value={this.state.location}
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
          />
      </View>
    );
  }

}
