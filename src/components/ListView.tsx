import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import STRINGS from '../constants/strings';

interface IListView {
    data: any[]  //sample json data added in src/containers/sampleData/daywiseData.json
}

const ListView = ({ data }: IListView) => {

    return (
        data.map((item, index) =>
            <View key={String(index)} style={styles.listContainer}>
                <Text style={styles.contentText}>{item?.name}</Text>
                <Text style={styles.contentText}>{STRINGS.aqi} {item?.value?.avg}</Text>
                <Text style={styles.contentText}>{STRINGS.min} {item?.value?.min}</Text>
                <Text style={styles.contentText}>{STRINGS.max} {item?.value?.max}</Text>
            </View>
        )
    )
}

export default ListView;
