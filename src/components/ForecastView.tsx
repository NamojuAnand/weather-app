import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import ListView from './ListView';
import { DAYS_ARRAY } from '../constants/constants';

interface IHeader {
    dayWiseData: any[]
}
const ForecastView = ({ dayWiseData }: IHeader) => {

    return (
        <View style={styles.aqiView}>
            {DAYS_ARRAY.map((day, index) =>
                <View key={String(index)}>
                    <Text style={styles.forecastViewHeader}>{day}</Text>
                    <ListView
                        data={dayWiseData.filter((item, index) => item?.day === day) || []}
                    />
                </View>
            )}
        </View>
    )
}

export default ForecastView;
