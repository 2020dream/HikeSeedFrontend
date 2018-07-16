import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import styles from '../Styles';

export default class Hike extends Component {

  static propTypes = {
    hike: PropTypes.object.isRequired,
  }

  render() {
    return (
      <View>
        <Text
          style={styles.subtitle}
          onPress={() => Actions.hikeDetails({hike: this.props.hike})}
          >
          {this.props.hike.name}
        </Text>
        <Text style={styles.subtext}>Distance: {this.props.hike.distance} miles</Text>
        <Text style={styles.subtext}>Date: {this.props.hike.date}</Text>
      </View>
    );
  }

}
