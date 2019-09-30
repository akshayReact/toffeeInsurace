import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableWithoutFeedback, Image, AsyncStorage, StatusBar,KeyboardAvoidingView } from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { ActionButton } from '../Components/ActionButton';
import { HINT_COLOR, INPUT_HINTCOLOR, INPUT_BORDERCOLOR, BOTTOMBAR_COLOR, THEME_PURPLE, THEME_OFFWHITE, THEME_SILVER, THEME_AQUA } from '../../AppConstants/ColorConstants';
import { CustomInput } from '../Components/CustomInput';
import { CheckBox } from 'react-native-elements'
import { CHECKED_IMAGE, UNCHECKED_IMAGE, CHECKEDBOX, UNCHECKEDBOX, MAIL_ICON, USER_ICON, LOCK_ICON } from '../../AppConstants/IconConstants';
import EventBus from 'react-native-event-bus'
import * as ApiManager from "../managers/api/ApiManager";
import * as ApiEndPoints from "../managers/api/ApiEndPoints";
import SnackBar from 'react-native-snackbar-component'
import { ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { NavigationActions,StackActions } from 'react-navigation';
import EnrollPopup from '../Components/EnrollPopup';

const resetAction = StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'login'})
  ]
})

const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userPassword: '',
            userName: '',
            phoneNumber: '',
            inProgress: false,
            showTerms:false
        }
    }

    getTextCallback(textValue, code) {
        this.setState({ [code]: textValue })
    }

 async validate() {
        if (this.state.userEmail) {
            if(emailRegex.test(this.state.userEmail)){
            if (this.state.userName) {
                    if (this.state.userPassword) {
                        if (this.state.userPassword.length>=8) {

                        if (this.state.termsAccepted) {

                            let obj={};
                            obj['email']=this.state.userEmail;
                            obj['password']=this.state.userPassword;
                            obj['name']=this.state.userName
                            console.log("signObj--->",obj)
                            this.setState({ inProgress: true })
                            await AsyncStorage.setItem('USER_DETAILS',JSON.stringify(obj));
                            this.props.navigation.navigate('login',{'data':{'email':this.state.userEmail,'password':this.state.userPassword}})
 
                        } else {
                            this.setState({
                                snackFlag: true,
                                snackColor: 'red',
                                snackMsg: "Please accept Terms & Conditions to continue",
                            })
                        }
                    } else {
                        this.setState({
                            snackFlag: true,
                            snackColor: 'red',
                            snackMsg: "Password should be 8 characters min.",
                        })
                    }
                    } else {
                        this.setState({
                            snackFlag: true,
                            snackColor: 'red',
                            snackMsg: "Please enter Password",
                        })
                    }

            } else {
                this.setState({
                    snackFlag: true,
                    snackColor: 'red',
                    snackMsg: "Please enter your Name",
                })
            }
        } else {
            this.setState({
                snackFlag: true,
                snackColor: 'red',
                snackMsg: "Please enter a valid email",
            })
        }
    } else {
        this.setState({
            snackFlag: true,
            snackColor: 'red',
            snackMsg: "Please enter Email",
        })
    }
    }

    render() {
        return (
            <View style={styles.container}>
            <CustomHeader bgColor={THEME_PURPLE} buttonPress={() => this.props.navigation.goBack()} screenTitle="Sign Up" />

            <KeyboardAvoidingView style={styles.kbContainer} enabled>
            <StatusBar backgroundColor={THEME_PURPLE} barStyle="light-content" />
            <EnrollPopup dismiss={() => this.setState({ showTerms: false })} 
             visible={this.state.showTerms}/>
                <SnackBar
                    visible={this.state.snackFlag}
                    accentColor="#FFFFFF"
                    messageColor="#FFFFFF"
                    textMessage={this.state.snackMsg}
                    backgroundColor={this.state.snackColor}
                    actionHandler={() => this.setState({ snackFlag: false })}
                    actionText="OK" />
                <View style={styles.formContainer}>
                    <ScrollView contentContainerStyle={{flex:1,justifyContent:'center'}}>
                        <View style={[styles.fieldContainer,{marginTop:180}]}>
                            <Image source={MAIL_ICON} style={{ width: 30, height: 30 }} resizeMode="contain" />
                            <CustomInput hintText="Enter Email" name="userEmail" textCallback={this.getTextCallback.bind(this)} keyboard="email-address"/>
                        </View>
                        <View style={[styles.fieldContainer, { marginTop: 15 }]}>
                            <Image source={USER_ICON} style={{ width: 30, height: 30 }} resizeMode="contain" />
                            <CustomInput hintText="Create a Username" name="userName" textCallback={this.getTextCallback.bind(this)}/>
                        </View>
                        <View style={[styles.fieldContainer, { marginTop: 15 }]}>
                            <Image source={LOCK_ICON} style={{ width: 30, height: 30 }} resizeMode="contain"/>
                            <CustomInput password={true} hintText="Create a Password" name="userPassword" textCallback={this.getTextCallback.bind(this)} />
                        </View>

                        <View style={styles.checkboxContainer}>
                            <TouchableWithoutFeedback onPress={() => this.setState({ termsAccepted: !this.state.termsAccepted })}>
                                <Image source={this.state.termsAccepted ? CHECKEDBOX : UNCHECKEDBOX} style={styles.iconStyle} resizeMode='contain' />
                            </TouchableWithoutFeedback>
                            <Text style={styles.termsText}>By clicking, you are agreeing to our <Text style={{color:THEME_AQUA,textDecorationLine:"underline"}} textDecorationColor={THEME_AQUA} textDecorationStyle="solid" onPress={()=>this.setState({showTerms:true})}>Terms of Service</Text></Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <ActionButton pressFunction={() => this.validate()}
                                bgColor={THEME_AQUA}
                                showLoader={this.state.inProgress}
                                titleColor="white"
                                btnTitle="SIGN UP" />
                        </View>
                        </ScrollView>
                </View>

            </KeyboardAvoidingView>
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
    kbContainer: {
        flex: 7,
        justifyContent: 'center',
        backgroundColor: THEME_OFFWHITE,
    },
    formContainer: {
        flex: 7,
        justifyContent: "flex-end",
        paddingHorizontal: '5%',
    },

    fieldContainer: {
        flexDirection:'row',
        alignItems:"center",
        justifyContent: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
        alignItems: 'center'
    },
    iconStyle: {
        height: 20,
        width: 20
    },
    termsText: {
        marginLeft: '5%',
        fontSize: RFPercentage(2),
        color: INPUT_HINTCOLOR
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
        paddingHorizontal: '10%'
    },

});
