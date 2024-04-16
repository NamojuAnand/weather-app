import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import STRINGS from '../constants/strings';
import moment from 'moment';

interface IAqiView {
    aqi: number;
    city: string;
    lat: string;
    long: string;
    updatedTime: string
}

const AqiView = ({
    aqi,
    city,
    lat,
    long,
    updatedTime
}: IAqiView) => {

    const getColor = () => {
        switch (true) {
            case (aqi <= 50):
                return {
                    color: '#15990E',
                    status: 'Good'
                };
            case (aqi <= 100):
                return {
                    color: '#BCAC0D',
                    status: 'Moderate'
                };
            case (aqi <= 150):
                return {
                    color: '#E78F12',
                    status: 'Unhealthy for Sensitive Groups'
                };
            case (aqi <= 200):
                return {
                    color: '#D23D24',
                    status: 'Unhealthy'
                };
            case (aqi <= 300):
                return {
                    color: '#5A0D7F',
                    status: 'Very Unhealthy'
                };
            case (aqi <= 500):
                return {
                    color: '#4A1409',
                    status: 'Hazardous'
                };
            case (aqi > 500):
                return {
                    color: '#750D20',
                    status: 'Very Hazardous'
                };
            default:
                return {
                    color: '#053772',
                    status: 'Unknown'
                };
        }
    };

    return (
        <View style={styles.aqiView}>
            <Text style={[styles.aqiStatus, { color: getColor().color }]}>{getColor().status}</Text>
            <Text style={styles.lableText}>{STRINGS.airQualityIndex}</Text>
            <Text style={[styles.aqi, { color: getColor().color }]}>{aqi}</Text>
            <Text style={styles.lableText}>{STRINGS.city} {city}</Text>
            <Text style={styles.lableText}>{STRINGS.lat} {lat}</Text>
            <Text style={styles.lableText}>{STRINGS.long} {long}</Text>
            <Text style={styles.lableText}>{STRINGS.lastUpdate} {moment(updatedTime).format('hh:mm: a')}</Text>
        </View>
    )
}

export default AqiView;
