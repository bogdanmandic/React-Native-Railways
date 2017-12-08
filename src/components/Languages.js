import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';


class Languages extends Component {

    onclickLanguageText = (lang) => {
        Alert.alert(
            'Change language to:',
            '' + lang,
            [
                { text: 'Change language', onPress: () => console.log('aaaa') },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    openLanguage = () => {
        return global.projectJson.languages.map((object, index) =>
            <View key={index}>
                <Text style={{ fontSize: 25, color: 'white' }} onPress={() => this.onclickLanguageText(object)}>{object.language}</Text>
                <View style={{ borderBottomWidth: 3, borderColor: 'white', }} />
            </View>
        );
    };

    render() {
        return (
            <View style={styles.langCont} >
                {this.openLanguage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    langCont: {
        position: 'absolute',
        backgroundColor: '#4169e1',
        top: 50,
        height: 70,
        width: '100%',
        zIndex: 3,
        alignItems: 'center'
    },
    textInput: {
        width: 300,
        height: 50
    }
});

export default Languages;