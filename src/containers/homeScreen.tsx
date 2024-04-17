/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Alert,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Config } from '../api/config';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import styles from './styles';
import Header from '../components/Header';
import AqiView from '../components/AqiView';
import ForecastView from '../components/ForecastView';
import STRINGS from '../constants/strings';
import { DAYS_ARRAY } from '../constants/constants';

const HomeScreen = () => {
    const [response, setResponse] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [accessDenied, setAccessDenied] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [searchResponse, setSearchResponse] = useState<any>();
    const [forecastData, setForecastData] = useState<any>();


    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        Geolocation.requestAuthorization(() => {
            Geolocation.getCurrentPosition((info: any) => {
                fetchAQIData(info);
            });
        }, (err) => {
            setAccessDenied(true);
            setLoading(false);
        })
    };

    const fetchAQIData = async (position: any) => {
        setLoading(true);
        setAccessDenied(false);
        let url = `${Config.BASE_URL}feed/geo:${position?.coords?.latitude};${position?.coords?.longitude}/?token=${Config.AQI_API_KEY}`;
        try {
            const response = await axios.get(url); //sample json data added in src/containers/sampleData/aqiData.json
            if (response?.data?.status === 'ok') {
                setResponse(response.data);
                getForecastData(response.data);
            } else {
                Alert.alert(STRINGS.error, STRINGS.errorMessage);
            }
        } catch (error) {
            Alert.alert(STRINGS.error, STRINGS.errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const getForecastData = (response: any) => {
        let dataArray: any = [];
        DAYS_ARRAY.map((day, index) => {
            Object.entries(response?.data?.forecast?.daily).map(([key, value]: any, objIndex) => {
                let objValue: number = value?.findIndex((item: any, innderIndex: any) => item?.day === day);
                let eachObj: any = {};
                eachObj['name'] = key;
                eachObj['day'] = day;
                eachObj['value'] = value[objValue]
                dataArray.push(eachObj);
            })
        });
        setForecastData(dataArray); //sample json data added in src/containers/sampleData/forecastData.json
    }

    const getSearchCityAQI = async () => {
        if (value === '') {
            Alert.alert(STRINGS.alert, STRINGS.enterCityName);
            return;
        }
        setLoading(true);
        let url = `${Config.BASE_URL}search/?token=${Config.AQI_API_KEY}&keyword=${value}`;
        try {
            const response = await axios.get(url); //sample json data added in src/containers/sampleData/searchApiData.json
            if (response?.data?.status === 'ok') {
                setSearchResponse(response?.data);

            } else {
                Alert.alert(STRINGS.alert, STRINGS.errorMessage);
            }
        } catch (error) {
            Alert.alert(STRINGS.alert, STRINGS.errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const showAlert = () => {
        Alert.alert(STRINGS.alert, STRINGS.enableMessage);
        return;
    }

    const renderContent = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header
                    screen={STRINGS.home}
                />
                <AqiView
                    aqi={response?.data?.aqi}
                    city={response?.data?.city?.name}
                    lat={response?.data?.city?.geo[0]}
                    long={response?.data?.city?.geo[1]}
                    updatedTime={response?.data?.time?.iso}
                />
                <Text style={styles.aqfHeader}>{STRINGS.airQualityForecast}</Text>
                <ForecastView
                    dayWiseData={forecastData}
                />
                <Text style={styles.searchHeader}>{STRINGS.searchHeader}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={value}
                        placeholder={STRINGS.enterCity}
                        keyboardType='default'
                        style={styles.textInput}
                        onChangeText={(text) => setValue(text)}
                    />
                    <TouchableOpacity onPress={() => getSearchCityAQI()}
                        style={styles.searchContainer}>
                        <Text style={styles.searchText}>{STRINGS.search}</Text>
                    </TouchableOpacity>
                </View>
                {searchResponse?.data?.length > 0 &&
                    <AqiView
                        aqi={searchResponse?.data[0]?.aqi}
                        city={searchResponse?.data[0]?.station?.name}
                        lat={searchResponse?.data[0]?.station?.geo[0]}
                        long={searchResponse?.data[0]?.station?.geo[1]}
                        updatedTime={searchResponse?.data?.time?.stime}
                    />
                }

            </ScrollView>
        )
    }

    const renderErrorPage = () => {
        return (
            <View style={styles.errorPage}>
                <TouchableOpacity onPress={() => showAlert()}
                    style={styles.accessButton}>
                    <Text style={styles.accessButtonText}>{STRINGS.getAccess}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.containerStyles}>
            {loading ?
                <ActivityIndicator
                    style={styles.loader}
                    color={'#053772'} size={'large'} />
                :
                accessDenied ?
                    renderErrorPage()
                    :
                    renderContent()
            }
        </SafeAreaView>
    )
}

export default HomeScreen;
