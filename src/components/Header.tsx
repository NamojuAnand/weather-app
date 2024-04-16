import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

interface IHeader {
    screen: string
}

const Header = ({ screen }: IHeader) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{screen}</Text>
        </View>
    )
}

export default Header;
