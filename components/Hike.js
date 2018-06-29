import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';

export default class Hike extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    created_at: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View>
        <Text>Location: {this.props.name}</Text>
        <Text>Distance: {this.props.distance} mile(s)</Text>
        <Text>Date: {Moment(this.props.created_at).format('MM-DD-YYYY')}</Text>
      </View>
    );
  }
}
