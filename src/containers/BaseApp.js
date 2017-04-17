/**
 * Created by air on 2017/4/17.
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Navigator,
    TabBarIOS,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import List from './List';


class BaseApp extends Component{
    constructor(props){
        super(props);
        this.initialRoute = {
            name: 'List',
            component: List,
        }

    }
    configureScene() {
        return Navigator.SceneConfigs.VerticalDownSwipeJump;
    }

    renderScene(route, navigator) {

        let Component = route.component;
        const { state, dispatch } = this.props;
        const action = bindActionCreators(actions, dispatch);

        return (
            <Component
                state={state}
                actions={action}
                {...route.params}
                navigator={navigator} />
        );
    }

    render(){
        var _this = this;
        return (
            <Navigator
                initialRoute={_this.initialRoute}
                configureScene={_this.configureScene.bind(_this)}
                renderScene={_this.renderScene.bind(_this)} />
        );
    }
}

function selector(state){
    return{
        state:state
    }
}
export default connect(selector)(BaseApp);
