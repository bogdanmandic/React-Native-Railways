import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Signup extends React.Component {

  goBack() {
    Actions.pop();
  }

  blank() {
    Actions.home()
  }

  render() {

    return (

      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ backgroundColor: '#4c69a5' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container2}
          scrollEnabled={false}
        >
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

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          <View style={styles.signupTC}>
            <TouchableOpacity onPress={this.goBack} style={styles.loginBtn}><Text style={styles.register}>Log in</Text></TouchableOpacity>
            <Text style={styles.tekst}>to an existing account</Text>
          </View>

          <View style={styles.skip}>
            <TouchableOpacity style={styles.skipBtn} onPress={this.blank} ><Text style={styles.tekst}>Skip</Text></TouchableOpacity>
          </View>

        </KeyboardAwareScrollView>
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
  },
  container2: {
    backgroundColor: '#4169e1',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: 600,
    height: 60,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 25,
    color: "black",
    marginVertical: 10,
    paddingLeft: 15
  },
  buttonText: {
    fontSize: 45,
    fontWeight: '500',
    color: "white",
    textAlign: 'center'
  },
  button: {
    width: 300,
    backgroundColor: '#4169e1',
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 5,
  },
  signupTC: {
    backgroundColor: '#4169e1',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  tekst: {
    fontSize: 40,
    color: "white",
  },
  register: {
    color: "white",
    fontSize: 45,
    fontWeight: '900'
  },
  loginBtn: {
    backgroundColor: '#4169e1',
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
  },
  skip: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    marginBottom: 30
  },
  skipBtn: {
    alignItems: 'center',
    width: 250,
    borderLeftWidth: 3,
    borderWidth: 3,
    borderColor: 'white',
    padding: 5
  },
})
