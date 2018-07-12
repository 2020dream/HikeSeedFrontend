import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
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
        <Text
          style={styles.subtitle}
          onPress={() => Actions.hikeDetails({hike: this.props.hike})}
          >
          {this.props.hike.name}
        </Text>
        <Text style={styles.text}>Distance: {this.props.hike.distance} miles</Text>
        <Text style={styles.text}>Date: {this.props.hike.date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
});
