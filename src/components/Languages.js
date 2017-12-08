import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';


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
                <TouchableOpacity style={{ margin: 10, height: 37, width:150, backgroundColor: '#dddddd', alignItems: 'center'}} onPress={() => this.onclickLanguageText(object.language)}>
                    <Text style={{ fontSize: 25, color: '#595959' }} >{object.language}</Text>
                </TouchableOpacity>
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
        height: 75,
        width: '100%',
        zIndex: 3,
        alignItems: 'center',
        borderBottomWidth: 3,
        borderColor: '#dddddd',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default Languages;