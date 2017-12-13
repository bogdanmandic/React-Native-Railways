import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Login extends React.Component {

  signup() {
    Actions.signup()
  };

  blank() {
    Actions.reset('home')
  }

  render() {
    return (

      <View style={styles.container}>
        <StatusBar barStyle="dark-content" hidden={true} />

        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'column' }}>
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="E-Mail"
            placeholderTextColor="grey"
            selectionColor="blue"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.password.focus()}
          />

          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="grey"
            returnKeyType="go"
            ref={(input) => this.password = input}
          />
        </View>

        <View style={styles.login}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column' }}>
          <View style={styles.signupTC}>
             <Text onPress={this.signup} style={styles.register}>Signup </Text>
            <Text style={styles.tekst}>a new account</Text>
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
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#4169e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    flex:1.5,
    alignItems:'center',
    justifyContent: 'center'
  },
  container2: {
    backgroundColor: '#4169e1',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 600,
    // height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 25,
    color: "black",
    margin: 10,
    // paddingLeft: 15
  },
  buttonText: {
    fontSize: 65,
    fontWeight: '500',
    color: "white",
    textAlign: 'center'
  },
  button: {
    // width: 300,
    backgroundColor: '#4169e1',
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
  signupBtn: {
    backgroundColor: '#4169e1',
    borderRadius: 10,
    width: 165,
    // alignItems: 'center',
  },
    skip: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: 200,
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
