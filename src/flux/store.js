import * as Redux from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reduxCatch from 'redux-catch';
const objectAssign = require('object-assign');


export class Store {


    constructor(reducer) {

        var rootReducer;

        if (typeof (reducer) === 'object') {
            rootReducer = Redux.combineReducers(reducer);
        } else {
            rootReducer = reducer;
        }

        function errorHandler(error, getState) {
            console.error(error);
            console.debug('current state', getState());
        }

        const middleware = [reduxCatch(errorHandler), thunk, logger()];

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