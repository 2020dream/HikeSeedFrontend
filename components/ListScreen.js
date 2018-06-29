import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import axios from 'axios';

import Hike from './Hike';

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hikes: [],
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3000/hikes')
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
          name={hike.name}
          distance={hike.distance}
          created_at={hike.created_at}
        />
      );
    });
    return hikeList;
  }

  render() {
    return (
      <View>
        {this.renderHikeList()}
      </View>
    );
  }

}
