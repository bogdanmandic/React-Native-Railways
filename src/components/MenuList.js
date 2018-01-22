import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Menu1 from './Menu1';
import Menu2 from './Menu2';


class MenuList extends React.PureComponent {

    state = {
        //languangeId: 2,
        menus: this.props.data.menuTrees[global.language].menuTree, // promeniti lang u dinamicki (ovo je samo english)
        selected: this.props.selected || 0,
        pages: this.props.data.pages,
        fromObj: {}
    };

    componentDidMount() {
        //this.refs._scrollView1.scrollTo({ y: 0, x:  });
        //this.calculateMenu1();
        //this.refs._scrollView1.scrollTo({y:30, x: 30, animated: true});
        //if (this.props.from)
            this.chooseSelected(this.state.fromObj);

    }
    componentWillMount() {
        // this.setState({menus: this.props.data.menuTrees[this.props.a-1].menuTree});
        this.setState({
            fromObj: global.globalJson.menus[global.language].menu.find(o =>
                o.menuId == this.props.from
            )
        });
    } 

    chooseSelected(m) {
        // this.props.from
        
        if (m.parentId == 0) {
            
            this.state.menus.map((cale, i) => {
                if (cale.menuId == m.menuId) {
                    
                    this.setState({ selected: i })
                }
            })
        }
        else {
            
            let a = global.globalJson.menus[global.language].menu.find(x => x.menuId == m.parentId);
            this.chooseSelected(a)
        }
    }




    calculateMenu1() {
        for (let i = 0, l = this.state.menus.length; i < l; i++) {
            if (this.state.selected == i) {
                this.refs['_menu1' + i].measure(
                    (fx, fy, width, height, px, py) => {

                        console.log('Component width is: ' + width)
                        console.log('Component height is: ' + height)
                        console.log('X offset to frame: ' + fx)
                        console.log('Y offset to frame: ' + fy)
                        console.log('X offset to page: ' + px)
                        console.log('Y offset to page: ' + py)
                    })

            }
        }
    }


    componentDidUpdate() {

        this.refs._scrollView2.scrollTo({ y: 0, x: 0, animated: true });
    }

    renderMenus1() {

        return this.state.menus.map((menu, i) =>
            <Menu1 onPress={() => this.setState({ selected: i })}
                isPressed={this.state.selected == i ? true : false}
                key={menu.menuId}
                menu1={menu}

            />
        );
    }

    renderMenus2() {

        if (this.state.menus[this.state.selected]) {
            if (this.state.menus[this.state.selected].children) {
                return this.state.menus[this.state.selected].children.map(menu =>

                    <Menu2
                        key={menu.menuId}
                        menu2={menu}
                        pages={this.state.pages}
                        from={this.props.from}
                        isPressed={this.props.from == menu.menuId ? true : false}
                        selected={this.state.selected}
                    />
                );
            }
        }
    }

    render() {
        
        return (

            <View style={styles.mainCont}>
                <ScrollView ref='_scrollView1' horizontal={true} style={styles.menu1Container} showsHorizontalScrollIndicator={false}>
                    {this.renderMenus1()}
                </ScrollView>

                <ScrollView ref='_scrollView2' showsHorizontalScrollIndicator={false} horizontal={true} style={{ flexDirection: 'row' }}>
                    {this.renderMenus2()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    menu1Container: {
        flexDirection: 'row',

    },
    mainCont: {
        backgroundColor: 'white',
        paddingBottom: 0,
        position: 'relative',
        height: '100%',
        width: '100%',
        zIndex: 4
        //bottom: '7%'
    }
}


export default MenuList;
