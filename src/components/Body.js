import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FullImage from './temp1_fullimage';
import ImageButtons from './temp2_imagebuttons';
import TextImage from './temp3_textimage';
import FullText from './temp4_fulltext';
import Swiper from 'react-native-swiper';
import RNFB from 'react-native-fetch-blob';


class Body extends Component {


    filterBody() {
        const pathToFiles = `file://${RNFB.fs.dirs.DocumentDir}/`
        //const pathToFiles = RNFB.fs.dirs.DocumentDir + '/';
        return this.props.pages.map(page => {

            let title = page.title;
            let subtitle = page.subtitle;
            let text = page.text;
            let files = [];

            if (page.files) {
                files = page.files.map(file => {
                    return pathToFiles + file.fileId + '.' + file.ext;
                })
            }

            switch (page.templateId) {
                case '1':
                    return <FullImage key={page.pageId} files={files} />
                    break;

                case '2':
                    return <ImageButtons key={page.pageId} templateTitle={title} subtitle={subtitle} files={files} />
                    break;

                case '3':
                    return <TextImage key={page.pageId} templateTitle={title} subtitle={subtitle} files={files} text={text} />
                    break;

                case '4':
                    return <FullText key={page.pageId} subtitle={subtitle} templateTitle={title} text={text} />
                    break;

                default:
                    console.log('WTF?!');
            }
        })
    }

    render() {

        return (

            <View style={styles.bodyCont}>

                <Swiper 
                    loop={false}
                    paginationStyle={styles.pagginationStyle}
                >
                    {this.filterBody()}
                </Swiper>

            </View>
        );

    }
}

const styles = StyleSheet.create({
    bodyCont: {
        backgroundColor: 'white',
        width: '100%',
        height: '86%'
    },
    pagginationStyle: {
        bottom: 0,
        backgroundColor: '#fff'
    }
});

export default Body;