import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Button, Icon } from "react-native-elements";

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
      stage: 'seed',
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
        stage: 'seed',
      });
    } else if (age <= 3) {
      this.setState({
        uri: sproutUri,
        stage: 'sprout',
      });
    } else if (age <= 13) {
      this.setState({
        uri: leafUri,
        stage: 'leaf',
      });
    } else if (age <= 16) {
      this.setState({
        uri: flowerUri,
        stage: 'flower',
      });
    } else {
      this.setState({
        uri: seedingUri,
        stage: 'seeding'
      });
    }
  }

  renderSeedNicknames = () => {
    const nicknames = this.props.hike.seeds.map((seed, index) => {
      return (
        <View key={index}>
          <Text style={styles.text}>  - {seed.nickname}</Text>
        </View>
      );
    })
    return nicknames;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.hike.name}</Text>
        <Text style={styles.text}>Distance: {this.props.hike.distance} miles</Text>
        <Text style={styles.text}>Date: {Moment(this.props.hike.created_at).format('MM-DD-YYYY')}</Text>
        <Text style={styles.text}>Number of Plants: {this.props.hike.seeds.length}</Text>
        <Text style={styles.text}>Plant Growth Stage: {this.state.stage}</Text>
        <Image
          style={styles.image}
          source={{uri: this.state.uri}}
        />
        <Text style={styles.text}>Nicknames:</Text>
        {this.renderSeedNicknames()}
        <Button style={styles.button} backgroundColor='#9143b7' title='WEED' />
        <Button style={styles.button} backgroundColor='#9143b7' title='WATER' />
        <Button style={styles.button} backgroundColor='#9143b7' title='FERTILIZE' />
        <Button style={styles.button} backgroundColor='#9143b7' title='HARVEST' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 100,
    width: '100%',
    height: '100%',
  },
  title: {
    ...Platform.select({
         ios: { fontFamily: 'Optima-Bold', },
         android: { fontFamily: 'sans-serif-medium' }
    }),
    fontSize: 25,
    color: 'green',
    paddingBottom: 15,
  },
  text: {
    fontSize: 18,
    paddingBottom: 5,
  },
  image: {
    width: 130,
    height: 130,
    margin: 10,
  },
  button: {
    width: 130,
    marginBottom: 10,
  }
});
