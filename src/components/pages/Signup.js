import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Signup extends React.Component {

  goBack() {
    Actions.reset('login');
  }

  blank() {
    Actions.reset('home')
  }

  render() {

    return (
      <View style={styles.container}>

        <StatusBar barStyle="dark-content" hidden={true} />

        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 10}}>
          <ScrollView>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Email address"
              placeholderTextColor="grey"
              selectionColor="blue"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => this.name.focus()}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Name"
              placeholderTextColor="grey"
              selectionColor="blue"
              returnKeyType="next"
              ref={(input) => this.name = input}
              onSubmitEditing={() => this.user.focus()}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="User"
              placeholderTextColor="grey"
              selectionColor="blue"
              returnKeyType="next"
              ref={(input) => this.user = input}
              onSubmitEditing={() => this.password.focus()}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="grey"
              returnKeyType="go"
              ref={(input) => this.password = input}
              onSubmitEditing={() => this.company.focus()}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Company Name"
              placeholderTextColor="grey"
              selectionColor="blue"
              returnKeyType="next"
              ref={(input) => this.company = input}
              onSubmitEditing={() => this.country.focus()}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Country"
              placeholderTextColor="grey"
              selectionColor="blue"
              returnKeyType="next"
              ref={(input) => this.country = input}
            />
          </ScrollView>
        </View>

        <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1.5, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
          <View style={styles.signupTC}>
            <Text onPress={this.goBack} style={styles.register}>Log in </Text>
            <Text style={styles.tekst}>to an existing account</Text>
          </View>

          <View style={styles.skip}>
            <TouchableOpacity style={styles.skipBtn} onPress={this.blank} ><Text style={styles.tekst}>Skip</Text></TouchableOpacity>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4169e1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  container2: {
    backgroundColor: '#4169e1',
    // flexGrow: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  inputBox: {
    width: 600,
    // height: 60,
    backgroundColor: "white",
    margin: 5,
    fontSize: 25,
    color: "black",
    borderRadius: 5,
    // marginVertical: 10,
    // paddingLeft: 15
  },
  buttonText: {
    fontSize: 45,
    fontWeight: '500',
    color: "white",
    textAlign: 'center',
  
  },
  button: {
    // width: 300,
    backgroundColor: '#4169e1',
    //marginTop: 20,
    // borderRadius: 25,
    // marginVertical: 5,
    // paddingVertical: 5,
  },
  signupTC: {
    backgroundColor: '#4169e1',
    marginBottom: 5,
    flexDirection: 'row',
  },
  tekst: {
    fontSize: 30,
    color: "white",
  },
  register: {
    color: "white",
    fontSize: 30,
    fontWeight: '900'
  },
 
  skip: {
    // justifyContent: 'center',
    // alignItems: 'center',
    //width: 300,
    backgroundColor: '#4169e1',
    // marginBottom: 30
  },
  skipBtn: {
    alignItems: 'center',
    width: 150,
    borderLeftWidth: 3,
    borderWidth: 3,
    borderColor: 'white',
    padding: 5
  },
})
