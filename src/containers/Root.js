import React from 'react';

import {createStore, combineReducers, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import * as reducers from '../reducers/index';
import App from './App';

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);

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
