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
import { Button } from "react-native-elements";

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
    const date = this.props.hike.date.split("-");
    const plantDate = new Date(date[2], date[0] - 1, date[1]);
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
        <View style={styles.nicknames} key={index}>
          <Text style={styles.text}> 🌻 {seed.nickname}</Text>
        </View>
      );
    })
    return nicknames;
  }

  renderButtons = () => {
    if (this.state.stage === 'seed') {
      return (
        <View>
          <Button style={styles.button} backgroundColor='#0478f4' title='WATER' />
        </View>
      );
    } else if (this.state.stage === 'sprout') {
      return (
        <View>
          <Button style={styles.button} backgroundColor='#468728' title='WEED' />
          <Button style={styles.button} backgroundColor='#0478f4' title='WATER' />
          <Button style={styles.button} backgroundColor='#49280f' title='FERTILIZE' />
        </View>
      );
    } else if (this.state.stage === 'leaf') {
      return (
        <View>
          <Button style={styles.button} backgroundColor='#468728' title='WEED' />
          <Button style={styles.button} backgroundColor='#0478f4' title='WATER' />
          <Button style={styles.button} backgroundColor='#49280f' title='FERTILIZE' />
        </View>
      );
    } else if (this.state.stage === 'flower') {
      return (
        <View>
          <Button style={styles.button} backgroundColor='#0478f4' title='WATER' />
          <Button style={styles.button} backgroundColor='#49280f' title='FERTILIZE' />
        </View>
      );
    } else if (this.state.stage === 'seeding') {
      return (
        <View>
          <Button style={styles.button} backgroundColor='#e5853b' title='HARVEST' />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.hike.name}</Text>
        <Text style={styles.text}>Distance: {this.props.hike.distance} miles</Text>
        <Text style={styles.text}>Date: {this.props.hike.date}</Text>
        <Text style={styles.text}>Number of Plants: {this.props.hike.seeds.length}</Text>
        <Text style={styles.text}>Plant Growth Stage: {this.state.stage}</Text>
        <View style={styles.subcontainer}>
          <Image
            style={styles.image}
            source={{uri: this.state.uri}}
            />
          <View>
            <Text style={styles.subtitle}>Nicknames:</Text>
            {this.renderSeedNicknames()}
          </View>
        </View>
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  subcontainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: 10,
  },
  title: {
    ...Platform.select({
        ios: {
          fontFamily: 'Optima-Bold',
          paddingTop: 10,
        },
        android: {
          fontFamily: 'sans-serif-medium',
          paddingTop: 10,
        }
    }),
    fontSize: 25,
    color: '#468728',
    paddingBottom: 10,
    textAlign: 'center',
  },
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
    fontSize: 18,
    padding: 5,
    textAlign: 'center',
  },
  image: {
    width: 130,
    height: 130,
    margin: 10,
  },
  nicknames: {
    alignItems: 'flex-start',
  },
  button: {
    width: 120,
    marginTop: 10,
  }
});
