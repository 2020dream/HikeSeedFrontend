import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
    axios.get('https://zc-hike-seed.herokuapp.com/hikes')
    .then((response) => {
      this.setState({
        hikes: response.data
      });
    })
    .catch((error) => {
      this.setState({
        message: error.message
      });
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
      <View>
        <Text style={styles.header}>HIKE & SEED</Text>
        <ScrollView>
          <Text style={styles.title}>Hike List</Text>
          {this.renderHikeList()}
        </ScrollView>
      </View>
    );
  }

}
