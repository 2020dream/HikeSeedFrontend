import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';

const seedUri = 'https://storage.googleapis.com/capstone-images/seed.png';
const sproutUri = 'https://storage.googleapis.com/capstone-images/sprout.png';
const leafUri = 'https://storage.googleapis.com/capstone-images/leaf.png';
const flowerUri = 'https://storage.googleapis.com/capstone-images/flower.png';
const seedingUri = 'https://storage.googleapis.com/capstone-images/seeding.png';

export default class HikeDetails extends Component {

  constructor() {
    super();

    this.state = {
      uri: seedUri,
    }
  }

  static propTypes = {
    hike: PropTypes.object.isRequired,
  }

  componentDidMount = () => {
    const today = new Date();
    const plantDate = new Date(this.props.hike.created_at);
    const age = Math.abs(today - plantDate) / 86400000;

    if (age <= 1) {
      this.setState({
        uri: seedUri,
      });
    } else if (age <= 3) {
      this.setState({
        uri: sproutUri,
      });
    } else if (age <= 13) {
      this.setState({
        uri: leafUri,
      });
    } else if (age <= 16) {
      this.setState({
        uri: flowerUri,
      });
    } else {
      this.setState({
        uri: seedingUri,
      });
    }
  }

  renderSeedNicknames = () => {
    const nicknames = this.props.hike.seeds.map((seed, index) => {
      return (
        <View key={index}>
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
        <Text>Distance: {this.props.hike.distance}</Text>
        <Text>Date: {Moment(this.props.hike.created_at).format('MM-DD-YYYY')}</Text>
        <Text>Plant Growth Stage:</Text>
        <Image
          style={{width: 50, height: 50}}
          source={{uri: this.state.uri}}
        />
        <Text>Number of Plants: {this.props.hike.seeds.length}</Text>
        {this.renderSeedNicknames()}
      </View>
    );
  }

}
