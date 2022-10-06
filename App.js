import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

import WeatherInfo from './components/WeatherInfo';
import UnitsPicker from './components/UnitsPicker';

import { colors } from './util';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`;

export default function App() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  const [units, setUnits] = useState('metric');

  const API_KEY = //API-Key;

    useEffect(() => {
      load();
    }, [units]);

  const load = async () => {
    setCurrentWeather(null);
    setErrorMsg(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const weatherURL = `${BASE_URL}lat=${latitude}&lon=${longitude}&units=${units}&appid=${API_KEY}`;

      const response = await fetch(weatherURL);
      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMsg(result.message);
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker units={units} setUnits={setUnits} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} units={units} />
      </View>
    );
  } else if (errorMsg) {
    return <View style={styles.container}>
      <Text>{errorMsg}</Text>
    </View>
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});
