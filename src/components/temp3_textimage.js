import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import LightBox from 'react-native-lightbox';
import HTML from 'react-native-render-html';
import Swiper from 'react-native-swiper';
import VB from './VideoBtn';
import DB from './DocBtn';


export default class TextImage extends Component {

  state = {
    videoPath: [],
    documentPath: [],
    imagesPath: []
  }

  componentWillMount() {
    let videos = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'mp4'
    })

    let documents = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'pdf'
    })

    let images = this.props.files.filter(file => {
      return file.substring(file.length - 3, file.length) == 'jpg' || file.substring(file.length - 3, file.length) == 'png'
    })

    this.setState({ videoPath: videos, documentPath: documents, imagesPath: images });
  }

  renderPics() {
    return this.state.imagesPath.map((pic, i) => {
      return <View key={i}>
        <LightBox style={{ width: '100%', height: '100%' }}>
          <Image style={styles.swiperPic} source={{ uri: pic }} />
        </LightBox>
      </View>
    })
  }

  render() {
    return (

      <View style={styles.mainView}>

        <View style={styles.body}>

          <View>
            <Text style={[styles.headingText, styles.headingMain]}>{this.props.title}</Text>
            <Text style={styles.headingText}>{this.props.subtitle}</Text>
          </View>

          <View style={styles.contentContainer}>

            <View style={styles.contentText}>
              <ScrollView>
                <HTML html={this.props.text} />
              </ScrollView>
            </View>

            <View style={styles.contentPic}>

              <ScrollView style={{ width: '100%', height: "100%" }} horizontal={true} showHorizontalScrollIndicator={false} pagingEnabled>
                {this.renderPics()}

              </ScrollView>
              <View style={styles.ButtonContainer}>
                {this.state.videoPath.length > 0 && <VB videouri={this.state.videoPath[0]} />}
                {this.state.documentPath.length > 0 && <DB documenturi={this.state.documentPath[0]} />}
              </View>

            </View>

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    position: 'relative',
    height: '100%'
  },
  body: {
    height: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  headingText: {
    color: '#1496ba',
    fontSize: 15,
    paddingBottom: 35
  },
  headingMain: {
    paddingTop: 40,
    paddingBottom: 4,
    fontSize: 25
  },
  contentContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 25,
    alignItems: 'center'
  },
  contentText: {
    flex: 2.5,
    backgroundColor: '#ebeced',
    padding: 20,
    paddingTop: 30
  },
  contentPic: {
    flex: 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  swiperPic: {
    width: 726.5,
    height: 600
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: '51%',
  }
});
