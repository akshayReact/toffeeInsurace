import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableWithoutFeedback,Image,Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { THEME_ORCHID } from '../../AppConstants/ColorConstants';
import { FB_ICON, FB_BTN } from '../../AppConstants/IconConstants';
var Icon = require('react-native-vector-icons/FontAwesome');
const { width } = Dimensions.get('window');
/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/
export default class FBLoginView extends Component {
  static contextTypes = {
    isLoggedIn: PropTypes.bool,
    login: PropTypes.func,
    logout: PropTypes.func,
    props: PropTypes.shape({})
	};

  constructor(props) {
      super(props);
    }

    render(){
        return (
        <TouchableWithoutFeedback onPress={() => {
                if(!this.context.isLoggedIn){
                  this.context.login()
                }else{
                  this.context.logout()
                }

              }}>
            <Image source={FB_BTN} style={{ width:width, height: 50 }} resizeMode="contain" />
     </TouchableWithoutFeedback>
      )
    }
}

const styles = StyleSheet.create({
    actionButtons:{
        flex:1,
        marginTop:10,
        paddingVertical:10,
        height:100,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      },
  });
  