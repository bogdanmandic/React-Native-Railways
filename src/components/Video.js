import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';

export default class VideoView extends Component {

    render() {

        return (
            <View style={styles.mainView}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems:'flex-start'}}>
                    <TouchableOpacity onPress={() => Actions.pop()}><Image style={styles.ico} source={require('./ico/32/back.png')} /></TouchableOpacity>
                </View>

                <View style={{ flex: 12 }}>
                <Video source={{ uri: this.props.videouri }}   // Can be a URL or a local file.
                            // Store reference
                            rate={1.0}                              // 0 is paused, 1 is normal.
                            volume={1.0}                            // 0 is muted, 1 is normal.
                            muted={false}                           // Mutes the audio entirely.
                            paused={false}                          // Pauses playback entirely.
                            resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                            repeat={true}                           // Repeat forever.
                            playInBackground={false}                // Audio continues to play when app entering background.
                            playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                            ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                            progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                            onLoadStart={this.loadStart}            // Callback when video starts to load
                            onLoad={this.setDuration}               // Callback when video loads
                            onProgress={this.setTime}               // Callback every ~250ms with currentTime
                            onEnd={this.onEnd}                      // Callback when playback finishes
                            onError={this.videoError}               // Callback when video cannot be loaded
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                            style={{ width: '100%', height: '100%' }} />
                </View>
              
            </View>

        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    ico: {
        height: 35,
        width: 35,
        margin: 10,
      
    },
});