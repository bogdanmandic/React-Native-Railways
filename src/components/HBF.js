import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import MenuList from './MenuList';
import Body from './Body';
import SettingsComponent from './Settings';
import Languages from './Languages';
import Search from './Search';


class HBF extends Component {

    state = {
        visibleMenu: false,
        visibleSearch: false,
        visiblelanguage: false,
    }
    openVideos = () => {
        Alert.alert('Otvorili ste meni za izbor video snimaka.')
      };

    render() {
        if (this.props.from == 'ab') {
            return (
                <View>
                    <Header title={'Settings'} onPressLang={() => { this.state.visiblelanguage ? this.setState({ visiblelanguage: false }) : this.setState({ visiblelanguage: true }) }} onPress={() => { this.state.visibleSearch ? this.setState({ visibleSearch: false }) : this.setState({ visibleSearch: true }) }} />
                    {this.state.visiblelanguage &&
                        <Languages />
                    }
                    {this.state.visibleSearch &&
                        <Search />
                    }
                    <SettingsComponent />
                    {this.state.visibleMenu &&
                        <MenuList data={global.globalJson} from={this.props.from.menuId} />
                    }
                    <Footer onPress={() => { this.state.visibleMenu ? this.setState({ visibleMenu: false }) : this.setState({ visibleMenu: true }); }} />
                </View>
            );
        } else {
            return (
                <View>
                    <Header title={this.props.from.title} onPressLang={() => { this.state.visiblelanguage ? this.setState({ visiblelanguage: false }) : this.setState({ visiblelanguage: true }) }} onPress={() => { this.state.visibleSearch ? this.setState({ visibleSearch: false }) : this.setState({ visibleSearch: true }) }} />
                    {this.state.visiblelanguage &&
                        <Languages />
                    }
                    {this.state.visibleSearch &&
                        <Search />
                    }
                
                    <Body pages={this.props.filtered} />
                   
                    {this.state.visibleMenu &&
                        <MenuList selected={} data={global.globalJson} from={this.props.from.menuId} />
                    }
              
                    <Footer onPress={() => { this.state.visibleMenu ? this.setState({ visibleMenu: false }) : this.setState({ visibleMenu: true }); }} />

                </View>
            );
        }
    }

}

const styles = StyleSheet.create({
    content3: {
     
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: '15%'
        },
        videotour:{
          backgroundColor: '#4169e1',
          width: 270,
          height: 39,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 90,
          paddingTop: 50
         },
         ico2:{
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

