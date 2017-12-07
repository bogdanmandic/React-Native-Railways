import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, WebView, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PDF from 'react-native-pdf';

export default class DocumentView extends Component {

    
    render() {

        return (
            <View style={styles.mainView}>
                <View style={{flex: 12}}>
                    <PDF
                        source={{uri: this.props.docuri}}
                        onLoadComplete={(pageCount,filePath)=>{
                            
                        }}
                        onPageChanged={(page,pageCount)=>{
                            
                        }}
                        onError={(error)=>{
                           
                        }}
                        style={styles.pdf}/>
                    {/* <PDF
                        source={{ uri: this.props.docuri }} //path of pdf file you saved
                        pageNumber={1}
                        onLoadComplete={(pageCount) => {
                        }}
                        style={styles.pdf}>
                    </PDF> */}
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <TouchableWithoutFeedback onPress={() => Actions.pop()}><Image style={styles.ico} source={require('./ico/back.png')} /></TouchableWithoutFeedback>
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
        height: 50,
        width: 50,
        marginRight: 15,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
    }
});