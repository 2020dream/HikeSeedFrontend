import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Actions } from 'react-native-router-flux';

export default class Hike extends Component {

  static propTypes = {
    hike: PropTypes.object.isRequired,
  }

  render() {
    return (
      <View>
        <Text onPress={() => Actions.hikeDetails({hike: this.props.hike})}>Location: {this.props.hike.name}</Text>
        <Text>Distance: {this.props.hike.distance} mile(s)</Text>
        <Text>Date: {Moment(this.props.hike.created_at).format('MM-DD-YYYY')}</Text>
      </View>
    );
  }

}
