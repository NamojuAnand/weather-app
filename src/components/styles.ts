import { Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    contentText: {
        flex: 1,
        color: '#000',
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: '400',
        marginTop: 2
    },
    header: {
        height: height * 0.1,
        backgroundColor: '#053772',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    aqiView: {
        backgroundColor: '#ECF6FE',
        margin: 10,
        borderWidth: 1,
        borderColor: '#EFEFEC',
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        shadowColor: '#000000'
    },
    aqiContainer: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    aqi: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    aqiStatus: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    lableText: {
        color: '#000',
        fontSize: 12,
        marginTop: 4,
        fontWeight: '400',
        fontStyle: 'italic'
    },
    forecastViewHeader: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4
    }
});

export default styles;