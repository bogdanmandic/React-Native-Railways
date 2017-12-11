import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ListView, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import RNFB from 'react-native-fetch-blob';

class Search extends Component {

    /**
     * represents state tracker
     * @field (string) text - from input field, used as parameter for search
     * @field (array) searchPages - result from search f'n, resource for render rows
     */
    state = {
        text: '',
        searchPages: [],
        searchFiles: [],
        searchMenus: [],
        buttonActive: 'content',
        menu: {}
    }
    /**
     * Searches for Menu Object by MenuId
     */
    searchMenu(menuId) {
        return global.globalJson.menus[1].menu.find(element => 
            menuId == element.menuId
        )
    }

    /*Actions.reset("HBF", {from: this.searchMenu(), filtered: element})}*/

    /**
     * Returns array of JSX titles of pages containing text from search
     */
    createObject() {
        let rat = [];
        switch (this.state.buttonActive) {
            case 'content':
                rat = this.state.searchPages.map((element, i) => {
                return <TouchableOpacity key={i} onPress={() => Actions.reset('HBF', {from: this.searchMenu(element.menuId), filtered: Array(element)})}> 
                        <Text style={{ fontSize: 25 }} key={element.pageId}>{element.title}</Text>
                        <Image
                            style={styles.ButtonIconStyle2}
                            source={{ uri: 'file://' + this.pageImageHelper(element.pageId) }}
                        />
                    </TouchableOpacity>

                });
                break;
            case 'video':
                rat = this.state.searchFiles.map((element, i) => {
                    if (element.type == 'video')
                        return <TouchableOpacity key={i} onPress={() => Actions.VideoView({videouri: 'file://' + RNFB.fs.dirs.DocumentDir + '/' +  element.fileId + '.' + element.ext})}>
                            <Text style={{ fontSize: 25 }} key={element.filename}>{this.pageTitleHelperForFile(element.pageId).title }</Text>
                            <Image
                                style={styles.ButtonIconStyle2}
                                source={{ uri: 'file://' + this.pageImageHelper(element.pageId) }}
                            />
                        </TouchableOpacity>
                });
                break;

            default:
                break;
        }

        return (
            <ScrollView style={{ padding: 20 }}>
                {rat}
            </ScrollView>
        )
    }

    //Actions.reset('HBF', {from: this.searchMenu(this.pageTitleHelperForFile(element.pageId).menuId), filtered: Array(this.pageTitleHelperForFile(element.pageId))})

    /**
     * If file is found in some page, return basic page info
     * @argument (string)
     */
    pageTitleHelperForFile = (pid) => {
        return this.state.searchPages.find(p => p.pageId == pid);
    }

    /**
     * returns uri from first image it finds 
     */
    pageImageHelper = (pid) => {
        let page = this.pageTitleHelperForFile(pid);
        let file = 'none';
        if (page.files != null)
            if (page.files.length > 0) {
                page.files.forEach(e => {
                    let dirs = RNFB.fs.dirs;
                    file = dirs.DocumentDir + '/' + e.fileId + '.' + e.ext;
                })
            }
        return file;
    }

    searchDoTitlesMENU = (item, where) => {

        return new Promise((resolve, reject) => {
            let rslt = where.filter(x =>
                x.title.toLowerCase().includes(item.toLowerCase())
            )
            resolve(rslt);
        })
    }

    searchDoTitlesPromiseWrapper = (item, where) => {
        return new Promise((resolve, reject) => {
            let foundMenus = this.searchDoTitlesMENU(item, where);
            resolve(foundMenus);
        })
    }

    searchDoPages = (item, where) => {
        return new Promise((resolve, reject) => {
            let foundPages = where.filter(x => {
                if (x.text != null)
                    return x.text.includes(item) || x.subtitle.includes(item) || x.title.includes(item);
                else if (x.text == null)
                    return x.subtitle.includes(item) || x.title.includes(item);
            })
            resolve(foundPages)
        })
    }

    searchDoFiles = (where) => new Promise((resolve, reject) => {
        let foundFiles = [];
        if (where != null)
            where.forEach(e => {
                if (e.files != null)
                    e.files.forEach(ei => foundFiles.push(ei))
            })
        resolve(foundFiles);
    })

    searchPromise = (input) => {
        return new Promise((resolve, reject) => {
            let idLang = 1 // engleski

            let pages = global.globalJson.pages;
            let menus = global.globalJson.menus[idLang].menu;

            let resultMenus = [];
            this.searchDoTitlesPromiseWrapper(input, menus)
                .then(r => { r.forEach(val => { resultMenus.push(val) }) })

            let resultPages = [];
            let resultFiles = [];
            this.searchDoPages(input, pages)
                .then(r => {
                    r.forEach(val => resultPages.push(val));
                    this.searchDoFiles(r)
                        .then((rlt) => {
                            resultFiles = rlt;
                        })
                        .then(() => resolve({
                            foundMenus: resultMenus,
                            foundPages: resultPages,
                            foundFiles: resultFiles
                        }))
                })
        })
    }

    callMe = (stuff) => {
        if (stuff.length >= 3)
            this.searchPromise(stuff).then(({ foundMenus, foundPages, foundFiles }) => {
                this.setState({
                    searchPages: foundPages,
                    searchFiles: foundFiles,
                    searchMenus: foundMenus
                });
                // console.log(this.state.searchPages)
            });
    }


    render() {


        // if (this.state.text.length >= 3)
        //     this.searchPromise(this.state.text).then((r) => this.setState({ searchPages: r.foundPages }));

        return (

            <View style={styles.searchCont} >

                <View>
                    <View style={{ alignItems: 'center', padding: 20 }}>
                        <Text style={{ color: 'black', fontSize: 20 }}>Choose the Category:</Text>
                    </View>
                    <View style={styles.ButtonsView}>
                        <TouchableOpacity style={styles.ButtonContent} onPress={() => this.setState({ buttonActive: 'content' })}>
                            <Image
                                style={styles.ButtonIconStyle2}
                                source={require('./ico/32/rnd.png')}
                            />
                            <Text style={styles.ButtonTextStyle}>CONTENT</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={styles.ButtonContent} onPress={() => this.setState({ buttonActive: 'video' })}>
                            <Image
                                style={styles.ButtonIconStyle2}
                                source={require('./ico/play-button.png')}
                            />
                            <Text style={styles.ButtonTextStyle}>VIDEO</Text>
                        </TouchableOpacity >
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30, }}>
                        <TouchableOpacity>
                            <Image
                                style={{ width: 32, height: 32 }}
                                source={require('./ico/32/search-2.png')}
                            />
                        </TouchableOpacity>
                        <View style={{ padding: 10 }}>
                            <TextInput
                                placeholder="Search"
                                style={styles.textInput}
                                onChangeText={(text) => {
                                    this.setState({ text });
                                    this.callMe(text)
                                }}
                                value={this.state.text}
                            />
                        </View>
                        <TouchableOpacity>
                            <Image
                                style={{ width: 32, height: 32 }}
                                source={require('./ico/32/right.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        {this.createObject()}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchCont: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        height: 500,
        width: '100%',
        top: 50,
        zIndex: 3,
        borderBottomWidth: 3,
        borderColor: '#dddddd',
    },
    textInput: {
        backgroundColor: 'white',
        width: 300,
        height: 50,
    },
    ButtonIconStyle2: {
        marginRight: 10,
        width: 32,
        height: 32
    },
    ButtonContent: {
        width: 200,
        height: 50,
        borderColor: '#4169e1',
        borderWidth: 3,
        borderRadius: 4,
        paddingHorizontal: 40,
        backgroundColor: '#4169e1',
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    ButtonsView: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ButtonTextStyle: {
        fontSize: 20,
        color: 'white'
    },
    ico: {
        height: 35,
        width: 35,
        margin: 10,
    }
});

export default Search;