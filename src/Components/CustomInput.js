import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback ,TextInput} from 'react-native';
import { INPUT_BORDERCOLOR,INPUT_HINTCOLOR } from '../../AppConstants/ColorConstants';

export const CustomInput = (props) => {
    const { hintText,textCallback,name,password,defValue,keyboard } = props
    return (
        <View style={{justifyContent:'center',flex:1,marginLeft:'2%'}}>
        <TextInput
        value={defValue?defValue:null}
        secureTextEntry={password}
            placeholder={hintText}
            keyboardType={keyboard}
            placeholderTextColor={INPUT_HINTCOLOR}
            style={styles.inputStyles}
            onChangeText={(txt) => textCallback(txt,name)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputStyles:{ 
        backgroundColor:'#FFFFFF',
        borderRadius: 5,
        elevation:2}
});
