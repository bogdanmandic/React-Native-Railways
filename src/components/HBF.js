import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Settings } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import MenuList from './MenuList';
import Body from './Body';
import SettingsComponent from './Settings';
import Languages from './Languages';
import Search from './Search';
import Orientation from 'react-native-orientation';


class HBF extends Component {

    state = {
        visibleMenu: false,
        visibleSearch: false,
        visiblelanguage: false,
        visiblesettings: false,
        languangeId: 0
    }
    openVideos = () => {
        Alert.alert('Otvorili ste meni za izbor video snimaka.')
    };

    render() {
        return (

            <View>
                <Header title={this.props.from.title} 
                onPressLang={() => { this.state.visiblelanguage ? this.setState({ visiblelanguage: false }) : this.setState({ visiblelanguage: true, visibleMenu: false, visibleSearch: false, visiblesettings: false }) }} 
                onPress={() => { this.state.visibleSearch ? this.setState({ visibleSearch: false }) : this.setState({ visibleSearch: true, visibleMenu: false, visiblelanguage: false, visiblesettings: false  }) }} 
                onPressSettings={() => { this.state.visiblesettings ? this.setState({ visiblesettings: false }) : this.setState({ visiblesettings: true, visibleMenu: false, visibleSearch: false, visiblelanguage: false  }) }} />

                {this.state.visiblelanguage &&
                    <Languages />
                }
                {this.state.visibleSearch &&
                    <Search />
                }
                {this.state.visiblesettings &&
                    <SettingsComponent />
                }


                <Body pages={this.props.filtered} />


                <View style={{ position: 'absolute', bottom: this.state.visibleMenu ? '7%' : -500 }}>
                    <MenuList selected={this.props.selected} a={this.props.languangeId ? Number(this.props.languangeId) + 1 : 2} data={global.globalJson} from={this.props.from.menuId} />
                </View>

                <Footer onPress={() => { this.state.visibleMenu ? this.setState({ visibleMenu: false }) : this.setState({ visibleMenu: true }); }} />

            </View>
        );
    }

}

const styles = StyleSheet.create({
    content3: {

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '15%'
    },
    videotour: {
        backgroundColor: '#4169e1',
        width: 270,
        height: 39,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 90,
        paddingTop: 50
    },
    ico2: {
        width: 24,
        marginRight: 20,
        height: 24,
        marginTop: 10
    },
    content2: {

        justifyContent: 'flex-start',
        marginLeft: '15%',

    },

});

export default HBF;

