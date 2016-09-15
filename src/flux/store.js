import * as Redux from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduxCatch from 'redux-catch';
import {reducer} from './global/reducer'
const objectAssign = require('object-assign');


export class Store {


    constructor(reducers) {

        var rootReducer;
        reducers.global = reducer;
        rootReducer = Redux.combineReducers(reducers);

        function errorHandler(error, getState) {
            console.error(error);
            console.error('current state', getState());
        }

        const middleware = [reduxCatch(errorHandler), thunk];

        var createStoreWithMiddleware = Redux.compose(
            Redux.applyMiddleware(
                ...middleware
            )
        )(Redux.createStore)


        this._store = createStoreWithMiddleware(rootReducer);

    }

    dispatch(action) {
        var getType = {};
        if (action.payload && getType.toString.call(action.payload) === '[object Function]') {
            action = action.payload();
        }
        return this._store.dispatch(action);
    }

    getState() {
        return objectAssign({}, this._store.getState());
    }

    subscribe(listener) {
        return this._store.subscribe(listener);
    }

}