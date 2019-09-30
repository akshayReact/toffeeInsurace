import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, Modal, TouchableWithoutFeedback, View, Image, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { CROSS_ICON, DEFAULT_IMAGE } from '../../AppConstants/IconConstants';
const { width, height } = Dimensions.get('window');
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { CUSTOM_GRAY_COLOR, HINT_COLOR, THEME_PURPLE } from '../../AppConstants/ColorConstants';
import { RFPercentage } from 'react-native-responsive-fontsize';

class EnrollPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        }
    }

    componentDidMount(){
        console.log(this.props)
    }
    render() {
        const { dismiss, visible, data, popupCallback, successNote, pressFunction, testName, loading } = this.props;

        return (


            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                style={{
                    flex: 1, justifyContent: 'center', shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2
                }}>

                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: ' rgba(0,0,0,0.7)', paddingHorizontal: '5%' }}>

                            <View style={{ backgroundColor: '#FFFFFF', justifyContent: 'flex-start', flexDirection: 'column', borderRadius: 10 }}>

                                <View style={{ justifyContent: 'flex-start', flexDirection: 'column', paddingHorizontal: '5%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                        <TouchableWithoutFeedback onPress={dismiss}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                                                <Image source={CROSS_ICON} style={{ width: 40, height: 40 }} resizeMode="contain" />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>

                                    <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                             
                                                <Text style={{ fontSize: 20, color: 'black' }}>Terms & Conditions</Text>
                                         
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
                                        <Text style={{ fontSize: RFPercentage(2) }}>Lorem ipsum</Text>
                                    </View>
                                    <ScrollView style={{ height: 150, marginTop: 10 }}>
                                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: RFPercentage(1.8) }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
                                        </View>
                                    </ScrollView>
                                </View>
                                    <View style={{ backgroundColor: THEME_PURPLE, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 50, borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                        <TouchableWithoutFeedback onPress={dismiss}>
                                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                                <Text style={{ color: '#FFFFFF', fontSize: RFPercentage(2.3) }}>ACCEPT & CONTINUE</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                

                            </View>

                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        fontSize: 18, fontFamily: 'Cochin', paddingTop: 10, paddingBottom: 10
    },
    titleContainer: {
        flex: 8,
        width: 170,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        position: 'relative'
    },
    textContainerStyle: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },

    buttonStyle: {
        height: 25,
        backgroundColor: "#279444",
        marginBottom: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    testDetails_container: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginHorizontal:5
    },
    parameterContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    paramLabel: {
        color: HINT_COLOR,
        fontSize: 12
    },
    paramValue: {
        color: HINT_COLOR,
        fontSize: 12,
    },
});

export default EnrollPopup;