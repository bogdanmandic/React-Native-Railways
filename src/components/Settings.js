import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class SettingsComponent extends Component {

  state = {
    settingsText: '',
  };

  textView(text) {
    return <Text>{text}</Text>;
  }

  Imprint = () => {
    this.setState({ settingsText: global.projectJson.project.imprintText });

  };
  Terms = () => {
    this.setState({ settingsText: global.projectJson.project.termsText });
  };
  Copyrights = () => {
    this.setState({ settingsText: global.projectJson.project.copyrightText });
  };
  Version = () => {
    this.setState({ settingsText: global.projectJson.project.version });

  }


  render() {


    return (



      <View style={styles.content}>
        <View style={{ backgroundColor: 'white', width: '40%', height: "100%", justifyContent: 'center' }}>
          <TouchableOpacity style={styles.btn_settings} onPress={this.Imprint}><Text style={styles.btn_text}>Imprint</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={this.Terms}><Text style={styles.btn_text}>Terms</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={this.Copyrights}><Text style={styles.btn_text}>Copyrights/License</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn_settings} onPress={this.Version}><Text style={styles.btn_text}>Version 1.0.1 (Build 28)</Text></TouchableOpacity>
        </View>
        <View style={{ backgroundColor: '#E0E0E0', width: '60%', height: "100%", borderWidth: 5, borderColor: 'white' }}>
          <Text style={styles.text}>{this.state.settingsText}</Text>
        </View>

      </View>

    );
  }


}


const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    width: '100%',
    height: '86%',
    flexDirection: 'row',
    position: 'absolute',
    top: '7%',
    zIndex: 3,
  },
  btn_settings: {
    backgroundColor: '#E0E0E0',
    height: "17%",
    width: "100%",
    paddingTop: 10,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center'
  },
  btn_text: {
    fontSize: 30,
    paddingLeft: 30,
    paddingTop: 7
  },
  text: {
    fontSize: 20,
    padding: 10,
    marginLeft: 10
  }
});
