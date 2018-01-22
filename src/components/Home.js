import React, { Component } from 'react';
import { View } from 'react-native';
import HBF from './HBF';

export default class Home extends Component {

  state = {
    menu: {},
    filtered: []
  };

  componentWillMount() {

    let a = this.findStartPage();
    global.language = Number(a[0].languageId)-1;
    let b = this.findMenu(a[0].menuId);
    this.setState({ menu: b, filtered: a });


  }

  render() {

    return (
      <View>
        <HBF visibleVideoTour={true} from={this.state.menu} filtered={this.state.filtered} />
      </View>
    );
  }


  findStartPage() {
    let a = [];
    for (let i = 0; i < global.globalJson.pages.length; i++) {
      if (global.globalJson.pages[i].pageId == global.globalJson.startPage) {
        a.push(global.globalJson.pages[i]);
      }
    }
    return a;
  }

  findMenu(menuIdS) {
    let menus = global.globalJson.menuTrees[global.language].menuTree;
    let found = {};

    for (let i = 0; i < menus.length; i++) {
      if (menus[i].menuId == menuIdS) { found = menus[i]; break; }
      else {
        if (menus[i].children)
          for (let j = 0; j < menus[i].children.length; j++) {
            if (menus[i].children[j].menuId == menuIdS) { found = menus[i].children[j]; break; }
            else {
              if (menus[i].children[j].children) {
                for (let k = 0; k < menus[i].children[j].children.length; k++) {
                  if (menus[i].children[j].children[k].menuId == menuIdS) { found = menus[i].children[j].children[k]; break; }
                }
              }
            }
          }
      }
    }
    return found;
  }

}

