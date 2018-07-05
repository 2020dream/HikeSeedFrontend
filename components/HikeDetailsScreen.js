import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';

const sproutUri = 'https://storage.googleapis.com/capstone-images/sprout.png';
const leafUri = 'https://storage.googleapis.com/capstone-images/leaf.png';
const flowerbudUri = 'https://storage.googleapis.com/capstone-images/flowerbud.png';
const flowerUri = 'https://storage.googleapis.com/capstone-images/flower.png';

export default class HikeDetails extends Component {

  constructor() {
    super();

    this.state = {
      uri: 'https://storage.googleapis.com/capstone-images/sprout.png',
    }
  }

  static propTypes = {
    hike: PropTypes.object.isRequired,
  }

  componentDidMount = () => {
    const today = new Date();
    const plantDate = new Date(this.props.hike.created_at);
    const age = Math.abs(today - plantDate) / 86400000;
    console.log(age);

    if (age <= 2) {
      this.setState({
        uri: sproutUri,
      });
    } else if (age <= 7) {
      this.setState({
        uri: leafUri,
      });
    } else if (age <= 13) {
      this.setState({
        uri: flowerbudUri,
      });
    } else {
      this.setState({
        uri: flowerUri,
      });
    }
  }

  renderSeedNicknames = () => {
    const nicknames = this.props.hike.seeds.map((seed, index) => {
      return (
        <View key={index}>
          <Image
            style={{width: 50, height: 75}}
            source={{uri: this.state.uri}}
          />
          <Text>Plant #{index + 1}: {seed.nickname}</Text>
        </View>
      );
    })
    return nicknames;
  }

  render() {
    return (
      <View>
        <Text>Location: {this.props.hike.name}</Text>
        <Text>Latitude: {this.props.hike.lat}</Text>
        <Text>Longitude: {this.props.hike.lon}</Text>
        <Text>Distance: {this.props.hike.distance}</Text>
        <Text>Date: {Moment(this.props.hike.created_at).format('MM-DD-YYYY')}</Text>
        <Text>Number of Plants: {this.props.hike.seeds.length}</Text>
        {this.renderSeedNicknames()}
      </View>
    );
  }

}
