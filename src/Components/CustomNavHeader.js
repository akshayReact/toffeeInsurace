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
import EventBus from 'react-native-event-bus'
import { LIST_BGCOLOR, INPUT_LINE_COLOR, HINT_COLOR, NAVBAR_THEME_COLOR, DEFAULT_IMG_BGCOLOR, LIST_ACTION_COLOR } from '../../AppConstants/ColorConstants';
import { BACK_BTN, SEARCH_BTN, MENU_ICON, CART_ICON, BELL_ICON, DEFAULT_IMAGE, NEXT_ICON, BOOKMARK_ICON, DOT_ICON, USERS_ICON, REFRESH_ICON, RUPEE_ICON, DOWN_ICON } from '../../AppConstants/IconConstants';

export default class CustomNavHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            searchStatus: false,
            data: [],
        }
    }

    drawerToggle=()=>{
        EventBus.getInstance().fireEvent("OPEN_DRAWER", {
        })
    }

    render() {
        const{headingTitle,menuMode,pressFunction,backBtn,dismiss,tabMode,menuPress,customColor}=this.props;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: customColor?customColor:NAVBAR_THEME_COLOR, paddingVertical: 5 }}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            { backBtn&&  
                    <TouchableWithoutFeedback onPress={()=>dismiss()}>
                        <Image source={BACK_BTN} style={{ height: 20,width: 20, tintColor:'#FFFFFF' }} resizeMode='contain' />
                    </TouchableWithoutFeedback>}
                </View>
                <View style={{ flex:5 }}>
                    {(this.state.searchStatus) ?
                        <TextInput
                            placeholder="search"
                            placeholderTextColor="#FFFFFF"
                            ref={(input) => { this.searchInput = input; }}
                            onBlur={() => this.setState({ searchStatus: false })}
                            value={this.state.searchTerm}
                            onChangeText={(txt) => this.setState({ searchTerm: txt },()=>this.props.searchCallback(txt))}
                            style={{ fontWeight: 'bold', color: '#FFFFFF', height: 40,marginLeft:'5%' }}/> :
                        <TouchableWithoutFeedback disabled={menuMode?false:true} onPress={()=>pressFunction()}>
                        <View style={{ height: 40, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>{headingTitle}</Text>
                            {menuMode &&
                                <Image source={DOWN_ICON} style={{ height: 10, width:10, tintColor:'#FFFFFF',marginLeft:'5%' }} resizeMode='contain' />
                                }
                        </View>
                        </TouchableWithoutFeedback>
                    }

                </View>
                {!tabMode&&
                <View style={{ flex:2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback>
                        <Image source={CART_ICON} style={{ height: 20, width: 20, tintColor:'#FFFFFF' }} resizeMode='contain' />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>this.drawerToggle()}>
                        <Image source={MENU_ICON} style={{ height: 25,width: 25,marginLeft:'15%' }} resizeMode='contain' />
                        </TouchableWithoutFeedback>
                </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: LIST_BGCOLOR,
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
});
