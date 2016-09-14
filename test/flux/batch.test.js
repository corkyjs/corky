import { Reducer } from '../../src/flux/reducer';
import { Action } from '../../src/flux/action';
import { AsyncAction } from '../../src/flux/asyncAction';
import { RequestAction } from '../../src/flux/requestAction';
import { BatchAction } from '../../src/flux/batchAction';
import { Store } from '../../src/flux/store';
import { assert } from 'chai';

describe('BatchRequestAction', function () {
    var jsonServer = require('json-server');
    var server = jsonServer.create();
    var router = jsonServer.router('../db.json');
    var middlewares = jsonServer.defaults();

    const response1 = { "id": 1, "title": "json-server", "author": "typicode" };
    const response2 = { "id": 2, "title": "json-server2", "author": "typicode2" };

    server.get('/post1', function (req, res) {
        res.jsonp(response1);
    })
    server.get('/post2', function (req, res) {
        res.jsonp(response2);
    })
    server.use(middlewares);
    server.use(router);
    server.listen(1337, function () {
    });


    const getUrl1 = 'http://127.0.0.1:1337/post1';
    const getUrl2 = 'http://127.0.0.1:1337/post2';
    const requestType = 'GET';

    const type1 = 'TEST1';
    const type2 = 'TEST2';

    it('getUrl', function (done) {

        const action1 = new RequestAction(type1, getUrl1, requestType);
        const action2 = new RequestAction(type2, getUrl2, requestType);
        const batch = new BatchAction('BATCH', [action1, action2]);

        const initialState = {
            response1: {},
            response2: {}
        };

        var testReducer = new Reducer([
            {
                action: action1.response,
                reduce: (state, payload) => {
                    state.response1 = payload;
                }
            },
            {
                action: action2.response,
                reduce: (state, payload) => {
                    state.response2 = payload;
                }
            }
        ]);


        const store = new Store({test: testReducer});
        store.dispatch(batch.payload({ abc: 3}));

        setTimeout(function () {
            assert.deepEqual(store.getState(), {test: { response1: response1, response2: response2 }, global: {}});
            done();
        }, 100);
    });

});

describe('BatchAction', function () {

    const initialState = {
        counter: 0
    };

    const asyncFunction = (payload, callback) => {
        callback(null, null);
    }

    const increment = new Action('INCREMENT');
    const decrement = new Action('DECREMENT');
    const action = new AsyncAction('TEST', asyncFunction);
    const batch = new BatchAction('BATCH', [increment, increment, action]);

    var testReducer = new Reducer([
        {
            action: increment,
            reduce: (state) => {
                state.counter++;
                return state;
            }
        },
        {
            action: decrement,
            reduce: (state) => {
                state.counter--;
                return state;
            }
        },
        {
            action: action.response,
            reduce: (state) => {
                state.counter++;
                return state;
            }
        }
    ], initialState);

    const store = new Store({test: testReducer});
    store.dispatch(batch);

    it('getState', (done) => {
        setTimeout(() => {
            assert.deepEqual(store.getState(), {test:{ counter: 3 }, global: {}});
            done();
        }, 100);
    });

});