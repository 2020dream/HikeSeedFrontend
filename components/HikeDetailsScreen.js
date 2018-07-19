import React, { Component } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { Button } from "react-native-elements";
import PropTypes from 'prop-types';
import axios from 'axios';

import styles from '../Styles';

const seedUri = 'https://storage.googleapis.com/capstone-images/seed.png';
const sproutUri = 'https://storage.googleapis.com/capstone-images/sprout.png';
const leafUri = 'https://storage.googleapis.com/capstone-images/leaf.png';
const flowerUri = 'https://storage.googleapis.com/capstone-images/flower.png';
const seedingUri = 'https://storage.googleapis.com/capstone-images/seeding.png';
const deadUri = 'https://storage.googleapis.com/capstone-images/dead.png';
const harvestUri = 'https://storage.googleapis.com/capstone-images/harvest.png';

// clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
const sunnyUri = 'https://storage.googleapis.com/capstone-images/sunny.png';
const rainUri = 'https://storage.googleapis.com/capstone-images/rain.png';
const snowUri = 'https://storage.googleapis.com/capstone-images/snow.png';
const sleetUri = 'https://storage.googleapis.com/capstone-images/sleet.png';
const windUri = 'https://storage.googleapis.com/capstone-images/wind.png';
const fogUri = 'https://storage.googleapis.com/capstone-images/fog.png';
const cloudyUri = 'https://storage.googleapis.com/capstone-images/cloudy.png';

export default class HikeDetails extends Component {

  constructor() {
    super();

    this.state = {
      uri: seedUri,
      stage: 'seed',
      weather: '',
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

    if (this.props.hike.is_harvest === true) {
      this.setState({
        uri: harvestUri,
        stage: 'harvested',
      });
    } else if (age <= 1) {
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
    } else if (age <= 25){
      this.setState({
        uri: seedingUri,
        stage: 'seeding',
      });
    } else {
      this.setState({
        uri: deadUri,
        stage: 'dead',
      });
    }

    this.getWeatherInfo();
  }

  renderSeedNicknames = () => {
    const nicknames = this.props.hike.seeds.map((seed, index) => {
      return (
        <View style={styles.nicknames} key={index}>
          <Text style={styles.midtext}> 🌻 {seed.nickname}</Text>
        </View>
      );
    })
    return nicknames;
  }

  renderWeatherIcon = () => {
    let icon = this.state.weather;
    let iconUri = '';
    if (icon === "clear-day" || icon === "clear-night") {
      iconUri = sunnyUri;
    } else if (icon === "rain") {
      iconUri = rainUri;
    } else if (icon === "snow") {
      iconUri = snowUri;
    } else if (icon === "sleet") {
      iconUri = sleetUri;
    } else if (icon === "wind") {
      iconUri = windUri;
    } else if (icon === "fog") {
      iconUri = fogUri;
    } else if (icon === "cloudy" || icon === "partly-cloudy-day" || icon === "partly-cloudy-night") {
      iconUri = cloudyUri;
    } else {
      iconUri = sunnyUri;
    }
    return (
      <Image
        style={styles.smallImage}
        source={{uri: iconUri}}
        />
    );
  }

  renderButtons = () => {
    if (this.state.stage === 'seed') {
      return (
        <View>
          {this.renderWaterButton()}
        </View>
      );
    } else if (this.state.stage === 'sprout') {
      return (
        <View>
          {this.renderWeedButton()}
          {this.renderWaterButton()}
          {this.renderFertilizeButton()}
        </View>
      );
    } else if (this.state.stage === 'leaf') {
      return (
        <View>
          {this.renderWeedButton()}
          {this.renderWaterButton()}
          {this.renderFertilizeButton()}
        </View>
      );
    } else if (this.state.stage === 'flower') {
      return (
        <View>
          {this.renderWaterButton()}
          {this.renderFertilizeButton()}
        </View>
      );
    } else if (this.state.stage === 'seeding') {
      return (
        <View>
          {this.renderHarvestButton()}
        </View>
      );
    }
  }

  renderWaterButton = () => {
    let disabled = false;
    if (this.state.weather === "rain" || this.state.weather === "snow") {
      disabled = true;
      Alert.alert('It\'s raining/snowing today, so no watering is needed!')
    }
    return(
      <Button style={styles.button} backgroundColor='#0478f4' title='WATER' disabled={disabled}
        onPress={() => { Alert.alert('Thanks for the drink!') }}
        />
    );
  }

  renderWeedButton = () => {
    return(
      <Button style={styles.button} backgroundColor='#468728' title='WEED'
        onPress={() => { Alert.alert('Good job cleaning up!') }}
        />
    );
  }

  renderFertilizeButton = () => {
    return(
      <Button style={styles.button} backgroundColor='#49280f' title='FERTILIZE'
        onPress={() => { Alert.alert('Yum yum!') }}
        />
    );
  }

  renderHarvestButton = () => {
    return(
      <Button style={styles.button} backgroundColor='#e5853b' title='HARVEST'
        onPress={() => {
          this.updateIsHarvest();
          Alert.alert('Enjoy your harvest! You deserve it!')
         }}
        />
    );
  }

  updateIsHarvest = () => {
    axios.put(`http://hike-env.wbcdfusnru.us-west-2.elasticbeanstalk.com/hikes/${this.props.hike.id}`, {
      params: {
        is_harvest: true,
      }
    })
      .then((response) => {
        this.setState({
          uri: harvestUri,
          stage: 'harvested',
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  getWeatherInfo = () => {
    axios.get(`https://api.darksky.net/forecast/036954698c0274b1db364efe54ff6234/${this.props.hike.lat},${this.props.hike.lon}?exclude=minutely,currently,hourly,flags`)
      .then((response) => {
        this.setState({
          weather: response.data.daily.data[0].icon,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.hike.name}</Text>
        <Text style={styles.midtext}>Distance: {this.props.hike.distance} miles</Text>
        <Text style={styles.midtext}>Date: {this.props.hike.date}</Text>
        <Text style={styles.midtext}>Number of Plants: {this.props.hike.seeds.length}</Text>
        <Text style={styles.midtext}>Plant Growth Stage: {this.state.stage}</Text>
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
        {this.renderWeatherIcon()}
        {this.renderButtons()}
      </View>
    );
  }

}
