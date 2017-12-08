import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';


class Languages extends Component {

    onclickLanguageText = (lang) => {
        Alert.alert(
            'Change language to:',
            '' + lang,
            [
                { text: 'Change language', onPress: () => console.log('will change app to ' + lang) },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        )
    }

    openLanguage = () => {
        return global.projectJson.languages.map((object, index) =>
            <View key={index}>
                <Text style={{ fontSize: 25, color: '#595959' }} onPress={() => this.onclickLanguageText(object.language)}>{object.language}</Text>
                <View style={{ borderBottomWidth: 3, borderColor: '#dddddd', }} />
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
        backgroundColor: '#fff',
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