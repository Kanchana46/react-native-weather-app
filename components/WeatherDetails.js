import { View, Text, StyleSheet, Grid } from 'react-native';
import React from 'react';
import { colors } from '../util';
import { FontAwesome5, Feather, Entypo, MaterialIcons } from '@expo/vector-icons'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors;

const WeatherDetails = ({ currentWeather, units }) => {

    const {
        main: { feels_like, humidity, pressure },
        wind: { speed }
    } = currentWeather;

    const windSpeed = units === "metric" ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`;
    const tempUnit = units === "metric" ? "C" : "F";

    return (
        <View style={styles.weatherDetails}>
            <View style={styles.weatherDetailsRow}>
                <View style={{ width: '45%', ...styles.weatherDetailsRow }}>
                    <FontAwesome5 name="temperature-low" size={25} color={PRIMARY_COLOR}></FontAwesome5>
                    <View style={{ ...styles.weatherDetailsItems }}>
                        <Text> Feels like  </Text>
                        <Text style={styles.textSecondary}> {feels_like}°{tempUnit}</Text>
                    </View>
                </View>
                <View style={styles.weatherDetailsRow}>
                    <Entypo name="drop" size={25} color={PRIMARY_COLOR} style={{ paddingRight: 23 }}></Entypo>
                    <View style={styles.weatherDetailsItems}>
                        <Text> Humdity </Text>
                        <Text style={styles.textSecondary}> {humidity}%</Text>
                    </View>
                </View>
            </View>
            <View style={styles.weatherDetailsRow}>
                <View style={{ width: '45%', ...styles.weatherDetailsRow }}>
                    <Feather name="wind" size={25} color={PRIMARY_COLOR}></Feather>
                    <View style={styles.weatherDetailsItems}>
                        <Text> Wind Speed </Text>
                        <Text style={styles.textSecondary}> {windSpeed}</Text>
                    </View>
                </View>
                <View style={styles.weatherDetailsRow}>
                    <MaterialIcons name="speed" size={25} color={PRIMARY_COLOR}></MaterialIcons>
                    <View style={styles.weatherDetailsItems}>
                        <Text> Pressure </Text>
                        <Text style={styles.textSecondary}> {pressure} hPa</Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default WeatherDetails;

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        borderWidth: 1,
        margin: 15,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
        marginBottom: 60,
        padding: 10
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        justifyContent: 'space-between',
    },
    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        margin: 7
    }
});