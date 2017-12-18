import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import LightBox from 'react-native-lightbox';
import HTML from 'react-native-render-html';
import Swiper from 'react-native-swiper';
import VB from './VideoBtn';
import DB from './DocBtn';

import SwiperFlatList from './SwiperFlatList';
export const { width, height } = Dimensions.get('window');


export default class TextImage extends Component {

  state = {
    videoPath: [],
    documentPath: [],
    imagesPath: [],
    startSwiper: false
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

  componentDidMount() {
    //setTimeout(() => {this.setState({ startSwiper: true })}, 500);
  }

  renderPics() {
    return this.state.imagesPath.map((pic, i) => {
      return <View key={i}>
        <LightBox style={{ width: '100%', height: '100%' }}>
          <Image resizeMethod='resize' style={styles.swiperPic} source={{ uri: pic }} />
        </LightBox>
      </View>
    })
  }

  render() {
    console.log('render temp3');
    return (

      <View style={styles.mainView}>

        <View style={styles.body}>

          <View>
            <Text style={[styles.headingText, styles.headingMain]}>{this.props.templateTitle}</Text>
            <Text style={styles.headingText}>{this.props.subtitle}</Text>
          </View>

          <View style={styles.contentContainer}>

            <View style={styles.contentText}>
              <ScrollView>
                <HTML html={this.props.text} />
              </ScrollView>
            </View>

            <View style={styles.contentPic}>

              <SwiperFlatList
                showPagination
                paginationActiveColor={'#007AFF'}
                removeClippedSubviews={true}
              >
                {this.renderPics()}
              </SwiperFlatList>

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
    height: Dimensions.get('window').height*0.55,
    width:Dimensions.get('window').width*0.55,
    alignSelf: 'center',
  },
  ButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: '51%',
  },
  pagination: {
    width: 10,
    height: 10
  }
});
