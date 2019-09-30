import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Dimensions, AsyncStorage, ActivityIndicator, StatusBar, ImageBackground } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { DEFAULT_IMAGE, BANNER_IMAGE, GROUP_ICON, BACKGROUND_IMAGE } from '../../AppConstants/IconConstants';
import { ActionButton } from '../Components/ActionButton';
import FBLoginView from '../Components/FbLoginView';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

import { THEME_PURPLE, THEME_AQUA, THEME_VIOLET, THEME_ORCHID, THEME_GRAY, THEME_SILVER, FACEBOOK_COLOR } from '../../AppConstants/ColorConstants';
const { width } = Dimensions.get('window');

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'homeScreen' })],
});

const resetLogAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login' })],
});

const resetSignAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'signupScreen' })],
});

export default class WelcomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tokenValue: null,
      showOptions: false,
      selectedCategories: [],
      isLoading: false,
      snackFlag: false
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={THEME_AQUA} barStyle="light-content" />
        <ImageBackground source={BACKGROUND_IMAGE} style={{ width: '100%', height: '100%' }}>
          <View style={{ flex: 2 }} />
          {
            this.state.isLoading ?
              <View style={styles.bottomContainer}>
                <ActivityIndicator size="large" color={THEME_PURPLE} />
              </View> :
              <View style={styles.buttonContainer}>
                <FBLogin
                  buttonView={<FBLoginView />}
                  ref={(fbLogin) => { this.fbLogin = fbLogin }}
                  loginBehavior={FBLoginManager.LoginBehaviors.Native}
                  permissions={["email", "user_friends"]}
                  onLogin={function (e) { console.log(e) }}
                  onLoginFound={function (e) { console.log(e) }}
                  onLoginNotFound={function (e) { console.log(e) }}
                  onLogout={function (e) { console.log(e) }}
                  onCancel={function (e) { console.log(e) }}
                  onPermissionsMissing={function (e) { console.log(e) }}
                />
                <ActionButton pressFunction={() => this.props.navigation.navigate('signupScreen')} bgColor={THEME_GRAY} titleColor="white" btnTitle="Register with Email" buttonMargin='2%' />
                <ActionButton pressFunction={() => this.props.navigation.navigate('login')} bgColor={THEME_SILVER} titleColor="black" btnTitle="Log In" buttonMargin='2%' />
              </View>
          }
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_AQUA,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  }
});
