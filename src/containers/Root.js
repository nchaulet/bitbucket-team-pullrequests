import React from 'react';

import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import * as reducers from '../reducers/index';
import App from './App';

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);

const matches = window.location.hash.match(/access_token=([^&;=]*)&/);
const initialState = {};

if (matches) {
    initialState.credentials = decodeURIComponent(matches[1]);
    window.location.hash = '';
}

const store = finalCreateStore(reducer, initialState);

class Root extends React.Component {

    render() {
        return (
            <Provider store={store}>{() => {
                return (<App />);
            }}</Provider>
        );
    }
}

export default Root;
