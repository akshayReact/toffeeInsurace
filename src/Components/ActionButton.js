import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableWithoutFeedback,ActivityIndicator,Image} from 'react-native';
import { HINT_COLOR, THEME_ORCHID, FACEBOOK_COLOR } from '../../AppConstants/ColorConstants';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { FB_ICON, FORWARD_ICON } from '../../AppConstants/IconConstants';

export const ActionButton = (props) => {
const {pressFunction,bgColor,titleColor,btnTitle,buttonMargin,showLoader,thinTitle}=props
    return (
        <TouchableWithoutFeedback onPress={pressFunction}>
            <View style={[styles.actionButtons,{backgroundColor:bgColor,marginHorizontal:buttonMargin}]}>
                {
                 showLoader?
                 <ActivityIndicator size="small" color="#FFFFFF" />:
                 <View style={{justifyContent:'center',alignItems:'center',flexDirection:"row"}}>
                  {bgColor==FACEBOOK_COLOR&&
                    <Image source={FB_ICON} style={{ width: 30, height: 30 }} resizeMode="contain" />
                  }   
                 <Text style={{ color:titleColor, fontWeight:thinTitle?'100':'600', fontSize: RFPercentage(2) }}>{btnTitle}</Text>
                 {btnTitle=="SHARE"&&
                    <Image source={FORWARD_ICON} style={{ width:20, height: 20,tintColor:'white' }}  resizeMode="contain" />
                 }
                 </View>
                }
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    actionButtons:{
        flex:1,
        marginTop:10,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
      },
});
