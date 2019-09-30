/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage,StatusBar,Image} from 'react-native';
import { CustomHeader } from '../Components/CustomHeader';
import { StackActions, NavigationActions } from 'react-navigation';
import { ActionButton } from '../Components/ActionButton';
import { HINT_COLOR, INPUT_HINTCOLOR, INPUT_BORDERCOLOR, BOTTOMBAR_COLOR, THEME_OFFWHITE, THEME_AQUA, THEME_PURPLE } from '../../AppConstants/ColorConstants';
import { CustomInput } from '../Components/CustomInput';
import EventBus from 'react-native-event-bus'
import SnackBar from 'react-native-snackbar-component'
import { LOCK_ICON,USER_ICON } from '../../AppConstants/IconConstants';

const resetHome = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'homeScreen' })],
});
const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      searchTerm:"",
      email:'',
      password:'',
      inProgress:false,
      selectedCategories:[]
    }
  }

  
  componentDidMount(){
    AsyncStorage.getItem('USER_DETAILS').then(value=>console.log("hululu--->",value));
   }

  componentDidMount(){
    let data=this.props.navigation.getParam('data')
    console.log('bbbb',data)

    if(data){
      this.setState({email:data.email,password:data.password},()=>{
        this.setState({
          snackFlag:true,
          snackColor:'green',
          snackMsg:"SignUp successful.",
        })
      })
    }else{
    AsyncStorage.getItem('USER_DETAILS').then(value=>{
      let data=JSON.parse(value)
      this.setState({email:data.email,password:data.password})
    });
    }
    EventBus.getInstance().addListener("LOGIN_SETUP", this.listener = data => {
      this.setState({email:data.email,password:data.password})
    })
  }

  getTextCallback(textValue,code){
    this.setState({[code]:textValue})
  }

   validate(){
    if(this.state.email){
      if(emailRegex.test(this.state.email)){
      if(this.state.password){
        this.setState({inProgress:true})
        this.props.navigation.dispatch(resetHome)

      }else{
        this.setState({
          snackFlag:true,
          snackColor:'red',
          snackMsg:"Please enter Password",
        })}
      }else{
        this.setState({
          snackFlag:true,
          snackColor:'red',
          snackMsg:"Please enter a valid Email",
        })}
    }else{
      this.setState({
        snackFlag:true,
        snackColor:'red',
        snackMsg:"Please enter Email",
      })}}


  render() {
    return ( 
      <View style={styles.container}>
                        <StatusBar backgroundColor={THEME_PURPLE} barStyle="light-content" />
        <CustomHeader bgColor={THEME_PURPLE} buttonPress={()=>this.props.navigation.goBack()} screenTitle="Login"/>
        
        <SnackBar 
        visible={this.state.snackFlag} 
        accentColor="#FFFFFF"
        messageColor="#FFFFFF"
        textMessage={this.state.snackMsg} 
        backgroundColor={this.state.snackColor} 
        actionHandler={()=>this.setState({snackFlag:false})} 
        actionText="OK"/>

          <View style={styles.blockContainer}>
          <View style={[styles.inputRow,{marginTop:30}]}>
          <Image source={USER_ICON} style={{ width: 30, height: 30 }} resizeMode="contain" />
                        <CustomInput defValue={this.state.email} hintText="Enter Email" name="email" textCallback={this.getTextCallback.bind(this)}/>
            </View>
            <View style={[styles.inputRow,{marginTop:15}]}>
            <Image source={LOCK_ICON} style={{ width: 30, height: 30 }} resizeMode="contain" />

                        <CustomInput defValue={this.state.password} password={true} hintText="Enter Password" name="password" textCallback={this.getTextCallback.bind(this)}/>
            </View>

                  <View style={styles.buttonContainer}>
                    <ActionButton pressFunction={()=>this.validate()} 
                    bgColor={THEME_AQUA} 
                    showLoader={this.state.inProgress}
                    titleColor="white" 
                    btnTitle="LOGIN"/>
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
    backgroundColor:THEME_OFFWHITE,
  },
  blockContainer:{
    flex:7,
    justifyContent:"flex-start",
    paddingHorizontal:'5%'
  },
  inputRow:{
    justifyContent:'center',
    flexDirection:'row',
    alignItems:'center'
  },
  forgotLabel:{fontSize:14,
    color:INPUT_HINTCOLOR,
    marginTop:'10%'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  buttonContainer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10%',
    marginHorizontal:'10%'
  },
  signupContainer:{
    justifyContent:'center',
    alignItems:'center',
    flex:2
  },
  signupLabel:{
    fontSize:14,
    color:INPUT_HINTCOLOR
  },
  signupTitle:{
    fontSize:16,
    color:THEME_AQUA}
});
