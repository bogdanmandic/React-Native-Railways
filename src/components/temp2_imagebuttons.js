import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, StatusBar } from 'react-native';
import VB from './VideoBtn';
import DB from './DocBtn';
import LightBox from 'react-native-lightbox';

export default class ImageButtons extends Component {

    state = {
        videoPath: [],
        documentPath: [],
        image: ''
    };

    componentWillMount() {
        let videos = this.props.files.filter(file => {
            return file.substring(file.length - 3, file.length) == 'mp4'
        })

        let documents = this.props.files.filter(file => {
            return file.substring(file.length - 3, file.length) == 'pdf'
        })

        let images = this.props.files.find(file => {
            return file.substring(file.length - 3, file.length) == 'jpg' 
            || file.substring(file.length - 3, file.length) == 'png' 
            || file.substring(file.length - 4, file.length) == 'jpeg'
        })


        this.setState({ videoPath: videos, documentPath: documents, image: images });
    }
    componentDidMount() {
        StatusBar.setHidden(true);
     }
    render() {
        return (
            
            <View style={styles.mainView}>
    
                <View style={styles.body}>

                    <View>
                        <Text style={[styles.headingText, styles.headingMain]}>{this.props.templateTitle}</Text>
                        <Text style={styles.headingText}>{this.props.subtitle}</Text>
                    </View>

                    <View style={styles.contentContainer}>

                        <View style={styles.contentPic}>

                            <LightBox style={{width: '100%', height: '100%' }}>
                              <Image resizeMethod='resize' style={{width: '100%', height: '100%', resizeMode: 'cover' }} source={{ uri: this.state.image }}/>
                            </LightBox>
                       
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
        backgroundColor: 'white',
        position: 'relative',
        height: '100%'
    },
    body: {
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    headingText: {
        color: '#1496ba',
        fontSize: 15,
        paddingBottom: 10,
        paddingLeft: 30
    },
    headingMain: {
        paddingTop: 20,
        paddingBottom: 4,
        fontSize: 25
    },
    contentContainer: {
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        marginBottom: 10,
        position: 'relative',
        flex: 1
    },
    contentPic: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        position: 'relative',
        alignItems: 'center'
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
});

