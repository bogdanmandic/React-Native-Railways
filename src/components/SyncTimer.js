import React, { Component } from 'react';
import { View, Text, Alert, NetInfo } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { Actions } from 'react-native-router-flux';
import App from '../../App';


class SyncTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSync: true
        };
        // this.timer = this.timer.bind(this);
    }

    syncItAlert() {
        const cancel = {
            text: 'Cancel',
            onPress: () => {
                console.log('stisnuo later');
                console.log(this.state.isSync);
                setTimeout(() => {
                    this.syncItAlert();
                }, 3000)
            }
        };
        const syncIt = {
            text: 'Sync it',
            onPress: () => {
                console.log('OK Pressed')
                // this.setState({ isSync: true })
                // console.log(this.state.isSync);
                // this.syncTimer();
                
            }
        };
        Alert.alert(
            'File sync is available',
            'What do you want to do?',
            [
                cancel,
                syncIt,
            ],
            { cancelable: false }
        )
    }

    syncTimer() {
        BackgroundTimer.setTimeout(() => {
            if (this.state.isSync) {
                console.log('Ovde su isti, ide reset timer i novo odbrojavanje!');
                this.setState({ isSync: false })
                this.syncTimer();
            } else {
                console.log('Nisu isti!');
                this.syncItAlert();
            }
        }, 3000)
    }

    render() {
        return (
            <View>
                <Text>Zdravo Timer</Text>
                {this.syncTimer()}
            </View>
        );
    }
}


export default SyncTimer;