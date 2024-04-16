import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    containerStyles: {
        flex: 1,
        backgroundColor: '#fff'
    },
    loader: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    errorPage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    accessButton: {
        height: height * 0.08,
        width: width * 0.8,
        backgroundColor: '#053772',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    accessButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchHeader: {
        color: '#000',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    inputContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        height: height * 0.06,
        width: width * 0.8,
        borderWidth: 1,
        borderRadius: 5,
    },
    textInput: {
        justifyContent: 'center',
        fontSize: 14,
        flex: 8,
        borderRightWidth: 1
    },
    searchContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchText: {
        color: '#A8A5A5',
        fontSize: 12
    },
    aqfHeader: {
        color: '#000',
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default styles;