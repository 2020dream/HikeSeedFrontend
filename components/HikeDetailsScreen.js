import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';

export default class HikeDetails extends Component {

  static propTypes = {
    hike: PropTypes.object.isRequired,
  }

  render() {
    return (
      <View>
        <Text>Location: {this.props.hike.name}</Text>
        <Text>Latitude: {this.props.hike.lat}</Text>
        <Text>Longitude: {this.props.hike.lon}</Text>
        <Text>Distance: {this.props.hike.distance}</Text>
        <Text>Date: {Moment(this.props.hike.created_at).format('MM-DD-YYYY')}</Text>
      </View>
    );
  }

}
