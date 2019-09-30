/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableWithoutFeedback, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { LIST_BGCOLOR, INPUT_LINE_COLOR, HINT_COLOR, NAVBAR_THEME_COLOR, DEFAULT_IMG_BGCOLOR, LIST_ACTION_COLOR } from '../../AppConstants/ColorConstants';
import { BACK_BTN, SEARCH_BTN, MENU_ICON, CART_ICON, BELL_ICON, DEFAULT_IMAGE, NEXT_ICON, BOOKMARK_ICON, DOT_ICON, USERS_ICON, REFRESH_ICON, RUPEE_ICON } from '../../AppConstants/IconConstants';
import * as ApiManager from "../managers/api/ApiManager";
import * as ApiEndPoints from "../managers/api/ApiEndPoints";
import { RFPercentage } from 'react-native-responsive-fontsize';

export const CustomHeader=(props)=>{
    const {buttonPress,screenTitle,bgColor}=props;
        return (
            <View style={[styles.container,{backgroundColor:bgColor?bgColor:'transparent'}]}>
                <View style={styles.btnContainer}>
                    <TouchableWithoutFeedback onPress={buttonPress}>
                        <Image source={BACK_BTN} style={{ height: 20,tintColor:bgColor?"#FFFFFF":null }} resizeMode='contain' />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flex: 7 }}>
                        <Text style={{fontSize:RFPercentage(3.3),fontWeight:'600',color:bgColor?"#FFFFFF":null}}>{screenTitle}</Text>
                </View>
            </View>
        )}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    btnContainer:{ 
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center' 
    }
});
