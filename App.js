import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NetInfo,
  Alert,
  StatusBar
} from 'react-native';
import RNFB from 'react-native-fetch-blob';
import axios from 'axios';
import hash from 'object-hash';
import * as Progress from 'react-native-progress';
import md5 from 'md5';
import Routes from './src/components/Routes';
import DeviceInfo from 'react-native-device-info';

import Orientation from 'react-native-orientation';


export default class App extends Component {

  state = {
    downloadedL: 0,
    downloaded: 0,
    isLoading: 1,
    visibleDownload: false,
    indeterminate: true,
    visibleDownloadError: false
  };

  componentDidMount(){
      Orientation.lockToLandscape();
    }

  isLoading() {
    const deviceId = DeviceInfo.getUniqueID();
    let dirs = RNFB.fs.dirs;
    let fetchedProject = {};
    let server = '';
    let lastChangesOld = '';
    const projectJsonURL = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=3&token=1234567890&deviceId' + deviceId;
    const pathToProjectJson = dirs.DocumentDir + '/projectJson.json';

    let fetchedContent = {};
    const pathToContentJson = dirs.DocumentDir + '/contentJson.json';
    const contentJsonURLReqParametri = '?a=ajax&do=getContent&projectId=3&token=1234567890&deviceId=' + deviceId ;
    let contentJsonURL = '';

    const pathToCheckedFiles = dirs.DocumentDir + '/checkedFiles.txt';


    projectJsonLogic = () => {
      return new Promise((resolve, reject) => {
        fetch(projectJsonURL)
          .then(res => res.json())
          .then(res => { fetchedProject = res; return Promise.resolve() })
          .then(() => RNFB.fs.exists(pathToProjectJson))
          .then(res => !res ? nePostojiProjectJson() : postojiProjectJson())
          .then(() => checkServer())
          .then(res => { console.log(res.config.url); server = res.config.url; return Promise.resolve(); })
          .then(() => { contentJsonURL = server + contentJsonURLReqParametri; return Promise.resolve() })
          .then(() => resolve())
          .catch((err) => reject(err))
      })
    }

    nePostojiProjectJson = () => {
      console.log('nePostojiProjectJson()');
      return new Promise((resolve, reject) => {
        RNFB.config({ path: pathToProjectJson }).fetch('GET', projectJsonURL)
          .then(res => { console.log(res.path()); global.projectJson = fetchedProject; return Promise.resolve() })
          .then(() => resolve())
          .catch((err) => reject(err));
      })
    }

    postojiProjectJson = () => {
      console.log('postojiProjectJson()');
      return new Promise((resolve, reject) => {
        RNFB.fs.readFile(pathToProjectJson, 'utf8')
          .then(res => {
            const projectJsonObj = JSON.parse(res);
            lastChangesOld = projectJsonObj.project.lastChanges;
            if (hash(fetchedProject) == hash(projectJsonObj)) {
              console.log('hashevi projectJsona su isti!');
              global.projectJson = projectJsonObj;
              return resolve();
            } else {
              // ovde obrisi check files
              console.log('hashevi projectJsona su razliciti!');
              global.projectJson = fetchedProject;
              RNFB.fs.unlink(pathToCheckedFiles)
                .then(() => RNFB.config({ path: pathToProjectJson }).fetch('GET', projectJsonURL))
                .then(() => resolve());
            }
          })
      })
    }

    checkServer = () => {
      let a = global.projectJson.project.servers.map(server =>
        axios.get(server)
      );
      return Promise.resolve(a[0]);
    }

    checkForFile = () => {
      return new Promise((resolve, reject) => {
        RNFB.fs.exists(pathToCheckedFiles)
          .then(res => !res ? resolve() : reject('Postoji checkedFiles.'))
      })
    }



    contentJsonLogic = () => {
      return new Promise((resolve, reject) => {
        fetch(contentJsonURL)
          .then(res => res.json())
          .then(res => { fetchedContent = res; return Promise.resolve() })
          .then(() => RNFB.fs.exists(pathToContentJson))
          .then(res => !res ? nePostojiContentJson() : postojiContentJson())
          .then(() => resolve())
          .catch((err) => reject(err))
      })
    }

    nePostojiContentJson = () => {
      console.log('nePostojiContentJson()');
      return new Promise((resolve, reject) => {
        RNFB.config({ path: pathToContentJson }).fetch('GET', contentJsonURL)
          .then(() => { global.globalJson = fetchedContent; return Promise.resolve() })
          .then(() => resolve('nije postojao contentJson, al sad je napravljen'))
          .catch((err) => reject(err))
      })
    }

    postojiContentJson = () => {
      console.log('postojiContentJson()');
      return new Promise((resolve, reject) => {
        RNFB.fs.readFile(pathToContentJson, 'utf8')
          .then(res => {
            global.globalJson = JSON.parse(res);
            if (fetchedProject.project.lastChanges == lastChangesOld) {
              console.log('usao u if od postojiContentJson()')
              return resolve()
            } else {
              console.log('Else u postoji content JSON')
              global.globalJson = fetchedContent;
              obrisiStare(global.globalJson, fetchedContent);

              RNFB.config({ path: pathToContentJson }).fetch('GET', contentJsonURL)
                .then(() => resolve())
            }
          })
      })
    }

    obrisiStare = (stariJson, noviJson) => {
      return new Promise((resolve, reject) => {
        let stageRemove = stariJson.files.filter(x => noviJson.files.map(nj => nj.hash).indexOf(x.hash) < 0);
        stageRemove.map(x => {
          deleteOne(x)
        })
      })
    }

    deleteOne = (file) => {
      let src = dirs.DocumentDir + '/' + file.fileId + '.' + file.ext;
      RNFB.fs.exists(src)
        .then(res => res ? RNFB.fs.unlink(src).then(() => console.log('Obrisa fajl: ' + src)) : console.log('Ne postoji taj fajl za brisanje'))
    }

    downloadOne = (file) => {
      return new Promise((resolve, reject) => {
        RNFB.config({ path: dirs.DocumentDir + '/' + file.fileId + '.' + file.ext }).fetch('GET', server + global.projectJson.project.contentDir + file.fileId + '?deviceId=' + deviceId)
          .then(r => {
            console.log(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext);
            console.log('One file downloaded at ', r.path());
            this.setState(prevState => ({ downloaded: prevState.downloaded + 1 }));
            return resolve();
          })
          .catch((err) => { this.setState({ visibleDownloadError: true }); return reject() })
      })
    }

    calculateSize = (filesArr) => {
      return new Promise((resolve, reject) => {
        let result = 0;
        if (filesArr.length <= 0) {

          reject('Array is empty')
        } else {
          filesArr.forEach(element => {
            result += Number(element.size);
          });
          result = (result / 1024 / 1024).toFixed(2);
          this.setState({ visibleDownload: true });
          return resolve(result);
        }
      })
    }

    alertForDownload = (mb) => {
      return new Promise((resolve, reject) => {
        if (!mb) {
          reject();
        }
        NetInfo.getConnectionInfo()
          .then((res) => {
            let cellularType = res.effectiveType;
            let warningString = res.type == 'cellular' ? 'Warning, you are on cellular ' + cellularType + ' network, this download could be charged.' : '';
            let downloadSpeed = 0;
            if (res.type == 'cellular')
              switch (res.effectiveType) {
                case '2g':
                  downloadSpeed = 0.04 / 8.0;
                  break;
                case '3g':
                  downloadSpeed = 6.04 / 8.0;
                  break;
                case '4g':
                  downloadSpeed = 18.4 / 8.0;
                  break;
              }
            if (res.type == 'wifi')
              downloadSpeed = 23.5 / 8.0;
            let est = downloadSpeed != 0 ? (mb / downloadSpeed / 60).toFixed(0) + ' minutes ' + ((mb / downloadSpeed).toFixed(0) % 60) + ' seconds' : 'inf.';
            Alert.alert(
              'About to download ' + mb + ' MB',
              '' + warningString + '\n' + 'Estimated time: ' + est + '.\nDo you wish to download?',
              [{ text: 'OK', onPress: () => resolve() }, { text: 'Skip', onPress: () => reject() }]

            )
          })
      })
    }

    checkHashFiles = () => {
      console.log('usao u hash files()');
      return new Promise((resolve, reject) => {
        let downloadStage = [];
        let a = global.globalJson.files.map(file =>
          RNFB.fs.exists(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext)
            .then(res => {
              if (!res) { /* && md5(dirs.DocumentDir + '/' + file.fileId + '.' + file.ext)  != file.hash*/
                downloadStage.push(file);
                return Promise.resolve();
              }
            })
        );
        //this.setState({ hashingL: a.length });
        Promise.all(a)
          .then(() => resolve(downloadStage))
          .catch(err => console.log('Greska kod checkHashFiles()' + err))
      })
    }

    downloadFiles = (filesArr) => {
      console.log('usao u downloadFiles()')
      return new Promise((resolve, reject) => {
        let a = filesArr.map(file =>
          downloadOne(file)
        );
        console.log(a);
        this.setState({ downloadedL: a.length });
        Promise.all(a)
          .then(() => console.log('All downloads finished!'))
          .then(() => RNFB.fs.writeFile(pathToCheckedFiles, 'true', 'utf8'))
          .then(() => resolve())
          .catch(err => console.log('Greska kod downloadFIles(): ' + err))
      })
    }

    akoImaNeta = () => {
      projectJsonLogic()
        .then(() => contentJsonLogic())
        .then(() => checkForFile())
        .then(() => checkHashFiles())
        .then((niz) => calculateSize(niz)
          .then((data) => alertForDownload(data))
          .then(() => downloadFiles(niz))
        )
        .catch(err => console.log('Catch od glavnog bloka od checkHashFiles: ' + err))
        .then(() => this.setState({ isLoading: 0 }))
    }

    akoNemaNeta = () => {
      RNFB.fs.exists(pathToContentJson)
        .then(res => {
          if (!res) {
            this.setState({ isLoading: -1 })
          } else {
            RNFB.fs.readFile(pathToContentJson, 'utf8')
              .then(res => { global.globalJson = JSON.parse(res); return Promise.resolve() })
              .then(() => this.setState({ isLoading: 0 }))
          }
        })
    }

    NetInfo.isConnected.fetch()
      .then(res => {
        if (res) {
          akoImaNeta();
        } else {
          akoNemaNeta();
        }
      })



  }// End of isLoading()

  componentWillMount() {
    this.isLoading();
  }

  calcProgress() {
    if (this.state.downloaded == 1) {
      this.state.indeterminate = false;
    }
    if (this.state.downloaded > 0) {
      return this.state.downloaded / this.state.downloadedL;
    }
  }



  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Routes />
        </View>
      );

    } else if (this.state.isLoading) {
      return (
        <View style={{ alignSelf: 'center', paddingTop: 120, width: "100%", height: "100%", backgroundColor: '#4169e1' }}>
         <StatusBar barStyle="dark-content" hidden={true} />
          <View style={{ alignSelf: 'center', width: 800, height: 500, backgroundColor: '#4169e1', justifyContent: 'center', }}>
            <Text style={styles.loadTextF}>Loading, please wait...</Text>
            {this.state.visibleDownloadError && <Text style={styles.loadText}>There seems to be corrupted download. Please restart the application if you see the bar below stuck.</Text>}
            {this.state.visibleDownload && <Text style={styles.loadText}>Downloaded {this.state.downloaded} of {this.state.downloadedL} files.</Text>}
            <Progress.Bar
              style={{ alignSelf: 'center', margin: 10, opacity: this.state.showProgress }}
              indeterminate={this.state.indeterminate}
              progress={this.calcProgress()}
              color='#fff'
            />
          </View>
        </View>
      );
    }
    else if (this.state.isLoading == 'offline') {
      return (
        <View style={{ alignSelf: 'center', paddingTop: 120, width: "100%", height: "100%", backgroundColor: '#4169e1' }}>
         <StatusBar barStyle="dark-content" hidden={true} />
          <View style={{ alignSelf: 'center', width: 800, height: 500, backgroundColor: '#4169e1' }}>
            <Text style={styles.loadText}>You are starting app for first time and you are offline. We need to show some content, and for this we need to download it.</Text>
            <Text style={styles.loadText}>Please connect to internet first.</Text>
          </View>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    paddingTop: 80
  },
  loadTextF: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    paddingBottom: 30
  }
});
