import React, { Component } from 'react';
import { StyleSheet, View, Image, StatusBar, TouchableWithoutFeedback, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import HTML from 'react-native-render-html';
import RNRestart from 'react-native-restart';

export default class Header extends React.Component {

  openLanguage = () => {
    this.props.onPressLang();
  };
  openHome = () => {
    Actions.reset('home')
  };
  openFavorites = () => {
    Actions.reset('login')
  };
  openMenu = () => {
    Actions.reset('login')
  };
  openSearch = () => {
    this.props.onPress();
  };
  openFolder = () => {
    Alert.alert('You opened Folder')
  };
  openSettings = () => {
    this.props.onPressSettings();
  };
  syncFiles = () => {
    //uradi sync fajlova
    this.syncApp();
  };
  componentDidMount() {
    StatusBar.setHidden(true);
  }


  syncApp() {
    const projectJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=3&token=1234567890';
    fetch(projectJsonURL)
      .then(res => res.json())
      .then(res => {
        if(res.project.lastChanges == global.projectJson.project.lastChanges)
        Alert.alert('App is already up to date!', '', [{ text: 'OK', onPress: () => {  } }])
        else {
          Alert.alert('There seems to be update.!', 'Do you wish to sync?', [{text: 'OK', onPress: () => { RNRestart.Restart(); }}, {text: 'Cancel', onPress: () => {  }}]);
          //Actions.reset('app');
        }
      })
  }


  render() {

    return (

      <View style={styles.navbarH}>

        <StatusBar barStyle="dark-content" hidden={true} />
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ flex: 3.5, alignItems: 'center', alignSelf: 'center', width: '100%' }}><HTML html={this.props.title ? this.props.title : ''} /></View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

            <TouchableWithoutFeedback onPress={this.openLanguage}><Image style={styles.ico} source={require('./ico/32/earth.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openHome}><Image style={styles.ico} source={require('./ico/32/home.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openFavorites}><Image style={styles.ico} source={require('./ico/32/star.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openMenu}><Image style={styles.ico} source={require('./ico/32/menu.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openSearch}><Image style={styles.ico} source={require('./ico/32/search.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openFolder}><Image style={styles.ico} source={require('./ico/32/folder.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.syncFiles}><Image style={styles.ico} source={require('./ico/32/sync.png')} /></TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.openSettings}><Image style={styles.ico} source={require('./ico/32/settings.png')} /></TouchableWithoutFeedback>

          </View>
        </View>
      </View>


    )
  }
}

const styles = StyleSheet.create({

  navbarH: {
    height: '7%',
    width: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: "center",
    flexDirection: 'row',
    paddingRight: 10,
    borderBottomWidth: 3,
    borderColor: '#dddddd'
  },
  ico: {
    height: 24,
    width: 24,
    marginLeft: 15,
  },
});