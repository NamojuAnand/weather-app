/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Dimensions, Text, Alert, ScrollView, PermissionsAndroid, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { Config } from '../api/config';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';

const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
    const [response, setResponse] = useState<any>({});
    const [yesterdayData, setYesterdayData] = useState<any>([]);
    const [todayData, setTodayData] = useState<any>([]);
    const [tomorrowData, setTomorrowData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [accessDenied, setAccessDenied] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [searchResponse, setSearchResponse] = useState<any>();


    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        try {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((checkResponse) => {
                if (!checkResponse) {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((grantResponse) => {
                        if (grantResponse === 'granted') {
                            Geolocation.getCurrentPosition((info: any) => {
                                fetchAQIData(info);
                            })
                        } else {
                            setLoading(false);
                            setAccessDenied(true);
                            Alert.alert('Alert!', 'You have set to never ask again. Please enable it in settings')
                        }
                    })
                } else {
                    Geolocation.getCurrentPosition((info: any) => {
                        fetchAQIData(info);
                    })
                }
            })
        }
        catch (err) {
            setLoading(false);
            setAccessDenied(true);
        }
    };

    const fetchAQIData = async (position: any) => {
        setLoading(true);
        setAccessDenied(false);
        let url = `https://api.waqi.info/feed/geo:${position?.coords?.latitude};${position?.coords?.longitude}/?token=${Config.AQI_API_KEY}`;
        try {
            const response = await axios.get(url);
            if (response?.data?.status === 'ok') {
                setResponse(response.data);
                getYesterdayData(response.data);
                getTodayData(response.data);
                getTomorrowData(response.data);

            } else {
                Alert.alert('Error', 'Error occured white fetching data')
            }
        } catch (error) {
            Alert.alert('Error', 'Error occured white fetching data')
        } finally {
            setLoading(false);
        }
    }

    const getYesterdayData = (response: any) => {
        let dataArray: any = [];
        Object.entries(response?.data?.forecast?.daily).map(([key, value]: any, index) => {
            let objValue: number = value?.findIndex((item: any, index: any) => item?.day === moment().subtract(1, 'day').format('YYYY-MM-DD'));
            let eachObj: any = {};
            eachObj['name'] = key;
            eachObj['value'] = value[objValue]
            dataArray.push(eachObj);
        })
        setYesterdayData(dataArray);
    }
    const getTodayData = (response: any) => {
        let dataArray: any = [];
        Object.entries(response?.data?.forecast?.daily).map(([key, value]: any, index) => {
            let objValue = value?.findIndex((item: any, index: any) => item?.day === moment().format('YYYY-MM-DD'));
            let eachObj: any = {};
            eachObj['name'] = key;
            eachObj['value'] = value[objValue]
            dataArray.push(eachObj);
        })
        setTodayData(dataArray);
    }
    const getTomorrowData = (response: any) => {
        let dataArray: any = [];
        Object.entries(response?.data?.forecast?.daily).map(([key, value]: any, index) => {
            let objValue = value?.findIndex((item: any, index: any) => item?.day === moment().add(1, 'day').format('YYYY-MM-DD'));
            let eachObj: any = {};
            eachObj['name'] = key;
            eachObj['value'] = value[objValue]
            dataArray.push(eachObj);
        })
        setTomorrowData(dataArray);
    }

    const getSearchCityAQI = async () => {
        setLoading(true);
        let url = `https://api.waqi.info/search/?token=${Config.AQI_API_KEY}&keyword=${value}`;
        try {
            const response = await axios.get(url);
            if (response?.data?.status === 'ok') {
                setSearchResponse(response?.data)

            } else {
                Alert.alert('Alert!', 'Error occured white fetching data')
            }
        } catch (error) {
            Alert.alert('Alert!', 'Error occured white fetching data')
        } finally {
            setLoading(false);
        }
    }

    const renderData = (dataArray: any[]) => (
        dataArray.map((item, index) =>
            <View key={String(index)} style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Text style={{ flex: 1, color: '#000', fontSize: 14 }}>{item?.name}</Text>
                <Text style={{ flex: 1, color: '#000', fontSize: 14 }}>avg:{item?.value?.avg}</Text>
                <Text style={{ flex: 1, color: '#000', fontSize: 14 }}>min:{item?.value?.min}</Text>
                <Text style={{ flex: 1, color: '#000', fontSize: 14 }}>max:{item?.value?.max}</Text>
            </View>
        )
    )

    const renderContent = () => {
        return (
            <ScrollView>
                <View style={{ height: height * 0.1, backgroundColor: '#053772', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Air Quality Index</Text>
                </View>
                <View style={{ flexDirection: 'row', height: height * 0.12, margin: 10 }}>
                    <View style={{ flex: 2, borderRadius: 10, backgroundColor: '#178971', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>{response?.data?.aqi}</Text>
                    </View>
                    <View style={{ flex: 8, paddingHorizontal: 10, justifyContent: 'center' }}>
                        <Text style={{ color: '#000' }}>city: {response?.data?.city?.name}</Text>
                        <Text style={{ color: '#000' }}>Lat: {response?.data?.city?.geo[0]}</Text>
                        <Text style={{ color: '#000' }}>Long: {response?.data?.city?.geo[1]}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Yesterday Forecast:</Text>
                    {renderData(yesterdayData)}
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Today Forecast:</Text>
                    {renderData(todayData)}
                </View>
                <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Tomorrow Forecast:</Text>
                    {renderData(tomorrowData)}
                </View>
                <Text style={{ color: '#000', marginTop: 10, marginLeft: 10, fontSize: 14, fontWeight: 'bold' }}>Search your preferred location below:</Text>
                <View style={{ flexDirection: 'row', marginTop: 10, height: height * 0.06, width: width * 0.8, borderWidth: 1, borderRadius: 5, alignSelf: 'center' }}>
                    <TextInput
                        value={value}
                        placeholder='Enter city name'
                        keyboardType='default'
                        style={{ justifyContent: 'center', fontSize: 14, flex: 8, borderRightWidth: 1 }}
                        onChangeText={(text) => setValue(text)}
                    />
                    <TouchableOpacity onPress={() => getSearchCityAQI()} style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#A8A5A5' }}>search</Text>
                    </TouchableOpacity>
                </View>
                {searchResponse?.data?.length > 0 &&
                    <View style={{ flexDirection: 'row', height: height * 0.12, margin: 10 }}>
                        <View style={{ flex: 2, borderRadius: 10, backgroundColor: '#178971', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>{searchResponse?.data[0]?.aqi}</Text>
                        </View>
                        <View style={{ flex: 8, paddingHorizontal: 10, justifyContent: 'center' }}>
                            <Text style={{ color: '#000' }}>city: {searchResponse?.data[0]?.station?.name}</Text>
                            <Text style={{ color: '#000' }}>Lat: {searchResponse?.data[0]?.station?.geo[0]}</Text>
                            <Text style={{ color: '#000' }}>Long: {searchResponse?.data[0]?.station?.geo[1]}</Text>
                        </View>
                    </View>
                }

            </ScrollView>
        )
    }

    const renderErrorPage = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => requestPermission()}
                    style={{ height: height * 0.08, width: width * 0.8, backgroundColor: '#053772', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Get access</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {loading ?
                <ActivityIndicator
                    style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
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
