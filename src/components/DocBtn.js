import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class DB extends Component {
    render() {

        return (

            <View>

                <TouchableOpacity style={styles.ButtonContent} onPress={() => Actions.DocumentView({ docuri: this.props.documenturi })}>
                    <Image
                        style={styles.ButtonIconStyle}
                        source={require('./ico/file.png')}
                    />
                    <Text style={styles.ButtonTextStyle}>DOCUMENT</Text>
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
    ButtonIconStyle: {
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