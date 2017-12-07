import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';

class Footer extends Component {

    render() {

        return (

            <View style={styles.footbar}>

                <TouchableOpacity onPress={this.props.onPress}>
                    <Image style={styles.ico} source={require('./ico/main_menu_2.png')} />
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    footbar: {
        height: '7%',
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
    },
    ico: {
        height: 24,
        width: 24,
        marginRight: 15,
    },
});

export default Footer;