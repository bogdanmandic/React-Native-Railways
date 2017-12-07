import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


export default class VB extends Component {

    render() {

        return (
            
            <View style={{ marginRight: 15 }}>

                <TouchableOpacity style={styles.ButtonContent} onPress={() => Actions.VideoView({ videouri: this.props.videouri })}>
                    <Image
                        style={styles.ButtonIconStyle2}
                        source={require('./ico/play-button.png')}
                    />
                    <Text style={styles.ButtonTextStyle}>VIDEO</Text>
                </TouchableOpacity >

            </View>
        );
    }
}

const styles = StyleSheet.create({

    ButtonTextStyle: {
        fontSize: 20,
        color: '#fff'
    },
    ButtonIconStyle2: {
        marginRight: 10,
        width: 32,
        height: 32
    },
    ButtonContent: {
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 4,
        paddingHorizontal: 40,
        backgroundColor: '#0082B3',
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});