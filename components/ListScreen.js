import React, { Component } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import axios from 'axios';

import Hike from './Hike';
import styles from '../Styles';

export default class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hikes: [],
    }
  }

  componentDidMount = () => {
    axios.get('http://hike-env.wbcdfusnru.us-west-2.elasticbeanstalk.com/hikes')
    .then((response) => {
      this.setState({
        hikes: response.data
      });
    })
    .catch((error) => {
      Alert.alert(error.message);
    });
  }

  renderHikeList = () => {
    const hikeList = this.state.hikes.map((hike, index) => {
      return (
        <Hike
          key={index}
          hike={hike}
        />
      );
    });
    return hikeList;
  }

  render() {
    return (
      <View style={{backgroundColor:'white'}}>
        <Text style={styles.header}>HIKE & SEED</Text>
        <ScrollView contentContainerStyle={{backgroundColor: 'white'}} style={styles.scrollview}>
          <Text style={styles.title}>Hike List</Text>
          {this.renderHikeList()}
        </ScrollView>
      </View>
    );
  }

}
