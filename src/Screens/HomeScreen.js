/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, StatusBar, Image, FlatList, TouchableWithoutFeedback,TextInput,KeyboardAvoidingView } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { StackActions, NavigationActions } from 'react-navigation';
import { ActionButton } from '../Components/ActionButton';
import { HINT_COLOR, INPUT_HINTCOLOR, INPUT_BORDERCOLOR, BOTTOMBAR_COLOR, THEME_OFFWHITE, THEME_AQUA, THEME_PURPLE, THEME_BOLD } from '../../AppConstants/ColorConstants';
import { CustomInput } from '../Components/CustomInput';
import ImagePicker from 'react-native-image-picker';
import { USERS_ICON, USER_ICON, SWITCH_ON, SWITCH_OFF, CHECKEDBOX, UNCHECKED_IMAGE, AVATAR_ICON, CHECKED_IMAGE } from '../../AppConstants/IconConstants';
import { ScrollView } from 'react-native-gesture-handler';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const SOCIAL_LIST = [{
    id: 1,
    name: 'Facebook'
},
{
    id: 2,
    name: 'Twitter'
},
{
    id: 3,
    name: 'Tumblr'
},
{
    id: 4,
    name: 'Flickr'
},]

export default class HomeScreen extends Component {
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
            location:"Name this location",
            caption:"Beautiful day to get married on the beach"
        }
    }

    componentDidMount() {
        this.showCamera()
    }

    showCamera() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    getTextCallback(textValue, code) {
        this.setState({ [code]: textValue })
    }

    getSelectedItems(id) {
        let checkItem = this.state.tempArr.indexOf(id)                    // for_simple_array
        if (checkItem > -1) {
            let voice = this.state.tempArr.filter(item => item !== id);
            this.setState({ tempArr: voice },()=>console.log('--',this.state.tempArr))
        } else {
            this.setState({ tempArr: this.state.tempArr.concat(id) },()=>console.log('++',this.state.tempArr))
        }
    }

    getCheckval(id){
        let check=this.state.tempArr.indexOf(id);
        console.log("CCCCCC",check)
       if(check>-1){
           return CHECKEDBOX;
       } 
       return UNCHECKED_IMAGE
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} enabled>
                <StatusBar backgroundColor={THEME_PURPLE} barStyle="light-content" />
                <CustomHeader bgColor={THEME_PURPLE} buttonPress={() => this.props.navigation.goBack()} screenTitle="Share with" />
                <View style={styles.switchContainer}>
                    <View style={[styles.switchTabView, { backgroundColor: THEME_PURPLE }]}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ selectedTab: 0, filtersUsed: { typeChoice: [], levelChoice: [], providersList: [] } })}>
                            <Text style={{ color: this.state.selectedTab == 0 ? 'white' : 'black', fontSize: 16, fontWeight: this.state.selectedTab == 0 ? '600' : '200' }}>FOLLOWERS</Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.switchTabView, { backgroundColor: THEME_PURPLE }]}>
                        <TouchableWithoutFeedback onPress={() => this.setState({ selectedTab: 1, filtersUsed: { typeChoice: [], levelChoice: [], providersList: [] } })}>
                            <Text style={{ color: this.state.selectedTab == 1 ? 'white' : 'black', fontSize: 16, fontWeight: this.state.selectedTab == 1 ? '600' : '200' }}>DIRECT</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

                <View style={styles.blockContainer}>
                    <ScrollView>
                    <View style={[styles.inputRow, { marginTop: 30 }]}>
                        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                        <Image source={this.state.avatarSource} style={{ height:100, width:100, borderWidth: 1, borderColor: 'black' }} resizeMode='contain' />
                        </View>
                        <View style={{flex:1, justifyContent:'center'}}>
                        <TextInput
                            multiline={true}
                            defaultValue={this.state.caption}
                            style={{ height:100}}
                            onChangeText={text =>this.setState({caption:text})}
                        />
                        </View>
                    </View>
                    <View style={[styles.inputRow, { marginTop: 15,paddingHorizontal:'5%' }]}>
                        <Image source={USER_ICON} style={{ width: 25, height: 25 }} resizeMode="contain" />
                        <Text style={{ fontSize: 16 }}>Tag People</Text>
                    </View>
                    <View style={{ marginTop: 15,justifyContent:'space-between',alignItems:'center',flexDirection:'row',paddingHorizontal:'5%', borderBottomColor:'silver',borderBottomWidth:1 }}>
                        <Text style={{ fontSize: 16 }}>Add to photo map</Text>
                        <TouchableWithoutFeedback onPress={() => this.setState({ switchVal: !this.state.switchVal })}>
                            <Image source={this.state.switchVal ? SWITCH_ON : SWITCH_OFF} style={{ width:50, height:50 }} resizeMode="contain" />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[styles.inputRow, { marginTop: 15,paddingHorizontal:'5%' }]}>
                    <TextInput
                            style={{ height:40}} defaultValue={this.state.location}
                            onChangeText={text =>this.setState({location:text})}
                        />
                    </View>

                    <View style={[styles.inputRow, { marginTop: 15 }]}>
                        <FlatList
                            numColumns={2}
                            extraData={this.state}
                            data={SOCIAL_LIST}
                            renderItem={({item}) => (
                                <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                    <Image source={this.state.tempArr.indexOf(item.id) > -1 ? CHECKED_IMAGE : UNCHECKED_IMAGE} style={{ width: 25, height: 25 }} resizeMode="contain" />
                                    <Text style={{ fontSize: 14, marginLeft: 10 }} onPress={() => this.getSelectedItems(item.id)}>{item.name}</Text>
                                </View>
                            )}
                            //Setting the number of column
                            keyExtractor={(item, index) => index}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <ActionButton pressFunction={() =>this.props.navigation.navigate('post',{'data':{'postPhoto':this.state.avatarSource,'caption':this.state.caption,'location':this.state.location}})}
                            bgColor={THEME_AQUA}
                            showLoader={this.state.inProgress}
                            titleColor="white"
                            btnTitle="SHARE" />
                    </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
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
        paddingVertical:10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: 'silver',
        borderBottomWidth: 1
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
        marginTop:10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    switchTabView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%'
    },
});
