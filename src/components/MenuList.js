import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import Menu1 from './Menu1';
import Menu2 from './Menu2';


class MenuList extends React.PureComponent {

    state = {
        menus: this.props.data.menuTrees[1].menuTree, // promeniti lang u dinamicki (ovo je samo english)
        selected: 0,
        pages: this.props.data.pages
    };

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
                    />
                );
            }
        }
    }

    render() {

        return (

            <View style={styles.mainCont}>
                <ScrollView horizontal={true} style={styles.menu1Container} showsHorizontalScrollIndicator={false}>
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
        position: 'absolute',
        bottom: '7%'
    }
}


export default MenuList;
