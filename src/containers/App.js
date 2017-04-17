/**
 * Created by air on 2017/4/17.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import BaseApp from './BaseApp';

//apply thunk

const createStoreWithThunk = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithThunk(reducer);


export default class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <BaseApp />
            </Provider>

        );
    }
}