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
      <View style={styles.container}>
        <Text
          style={styles.title}
          onPress={() => Actions.hikeDetails({hike: this.props.hike})}
          >
          {this.props.hike.name}
        </Text>
        <Text style={styles.text}>Distance: {this.props.hike.distance} miles</Text>
        <Text style={styles.text}>Date: {Moment(this.props.hike.created_at).format('MM-DD-YYYY')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    borderTopColor: 'green',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  title: {
    ...Platform.select({
         ios: { fontFamily: 'Optima', },
         android: { fontFamily: 'sans-serif-medium' }
    }),
    fontSize: 20,
    color: 'green',
  },
  text: {
    fontSize: 15,
  }
});
