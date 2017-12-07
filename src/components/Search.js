import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';


class Search extends Component {

    render() {

        return (

            <View style={styles.searchCont} >
                <Text style={{ color: 'white', fontSize: 20 }}>SEARCH SECTION</Text>
                <TextInput style={styles.textInput} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchCont: {
        position: 'absolute',
        backgroundColor: '#4169e1',
        top: 50,
        height: 100,
        width: '100%',
        zIndex: 3
    },
    textInput: {
        width: 300,
        height: 50
    }
});

export default Search;