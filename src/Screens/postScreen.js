/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, StatusBar, Image, FlatList, TouchableWithoutFeedback, TextInput,Dimensions } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { StackActions, NavigationActions } from 'react-navigation';
import { ActionButton } from '../Components/ActionButton';
import { HINT_COLOR, INPUT_HINTCOLOR, INPUT_BORDERCOLOR, BOTTOMBAR_COLOR, THEME_OFFWHITE, THEME_AQUA, THEME_PURPLE, THEME_BOLD, THEME_GRAY, THEME_RED, THEME_CYAN } from '../../AppConstants/ColorConstants';
import { CustomInput } from '../Components/CustomInput';
import ImagePicker from 'react-native-image-picker';
import { USERS_ICON, USER_ICON, SWITCH_ON, SWITCH_OFF, CHECKEDBOX, UNCHECKED_IMAGE, AVATAR_ICON, CHECKED_IMAGE, CLOCK_ICON, CALL_BOX, HEART_ICON } from '../../AppConstants/IconConstants';
const { width } = Dimensions.get('window');

export default class PostScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: "",
            email: '',
            password: '',
            inProgress: false,
            selectedCategories: [],
            caption: "Beautiful day to get married on the lake",
            tempArr: [],
            avatarSource: AVATAR_ICON,
            switchVal: false,
            location: "Name this location",
            authorName: '',
            caption: "Beautiful day to get married on the beach"
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('USER_DETAILS').then(value => {
            let data = JSON.parse(value)
            this.setState({ authorName: data.name })
        })
        let values = this.props.navigation.getParam('data')
        this.setState({
            postPhoto: values.postPhoto,
            location: values.location,
            caption: values.caption
        }, () => console.log('dddd', this.state))
    }


    getTextCallback(textValue, code) {
        this.setState({ [code]: textValue })
    }

    getSelectedItems(id) {
        let checkItem = this.state.tempArr.indexOf(id)                    // for_simple_array
        if (checkItem > -1) {
            let voice = this.state.tempArr.filter(item => item !== id);
            this.setState({ tempArr: voice }, () => console.log('--', this.state.tempArr))
        } else {
            this.setState({ tempArr: this.state.tempArr.concat(id) }, () => console.log('++', this.state.tempArr))
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor={THEME_PURPLE} barStyle="light-content" />
                <View style={styles.blockContainer}>
                    <View style={{ marginTop: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingHorizontal: '5%', borderBottomColor: 'silver', borderBottomWidth: 1 }}>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={USER_ICON} style={{ width: 25, height: 25 }} resizeMode="contain" />
                            <Text style={{ fontSize: 16, color: THEME_AQUA, textDecorationLine: "underline" }}>{this.state.authorName}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={CLOCK_ICON} style={{ width: 25, height: 25, tintColor: THEME_GRAY }} resizeMode="contain" />
                            <Text style={{ fontSize: 16, color: THEME_GRAY }}>2h</Text>
                        </View>
                    </View>
                    <Image source={this.state.postPhoto} style={{ width:width, height: 300 }} resizeMode="contain" />
                    <View style={[styles.inputRow, { marginTop: 15, paddingHorizontal: '5%' }]}>
                        <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Image source={CALL_BOX} style={{ width: 25, height: 25 }} resizeMode="contain" />
                            <Text style={{ fontSize: 16, color: THEME_AQUA, textDecorationLine: "underline" }}>{this.state.authorName}</Text>
                        </View>
                        <View style={{ justifyContent: 'center', flex: 1 }}>
                            <Text numberOfLines={5} style={{ fontSize: 16 }}>{this.state.caption}</Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        paddingHorizontal:'5%'
                    }}>
                        <Text style={{ fontSize: 16 }}>{this.state.location}</Text>
                    </View>

                    <View style={styles.switchContainer}>
                        <View style={[styles.switchTabView, { backgroundColor: THEME_RED }]}>
                            <Image source={HEART_ICON} style={{ width: 25, height: 25 }} resizeMode="contain" />
                            <TouchableWithoutFeedback onPress={() => this.setState({ selectedTab: 0, filtersUsed: { typeChoice: [], levelChoice: [], providersList: [] } })}>
                                <Text style={{ color: this.state.selectedTab == 0 ? 'white' : 'black', fontSize: 16, fontWeight: this.state.selectedTab == 0 ? '600' : '200' }}>Been there</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.switchTabView, { backgroundColor: THEME_CYAN,marginLeft:'2%' }]}>
                            <Image source={CALL_BOX} style={{ width: 25, height: 25 }} resizeMode="contain" />
                            <TouchableWithoutFeedback onPress={() => this.setState({ selectedTab: 1, filtersUsed: { typeChoice: [], levelChoice: [], providersList: [] } })}>
                                <Text style={{ color: this.state.selectedTab == 1 ? 'white' : 'black', fontSize: 16, fontWeight: this.state.selectedTab == 1 ? '600' : '200' }}>Comment</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        {/* </View> */}
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: THEME_OFFWHITE,
    },
    blockContainer: {
        flex: 7,
        justifyContent: "space-between",
    },
    inputRow: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    forgotLabel: {
        fontSize: 14,
        color: INPUT_HINTCOLOR,
        marginTop: '10%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    switchContainer: {
        paddingHorizontal:'5%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    switchTabView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%'
    },

});
