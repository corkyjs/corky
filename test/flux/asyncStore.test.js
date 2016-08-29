import {Reducer} from '../../src/flux/reducer';
import { Action } from '../../src/flux/action';
import { Store } from '../../src/flux/store';
import { AsyncAction } from '../../src/flux/asyncAction';
import { assert } from 'chai';

describe('AsyncStore', () => {

    const initialState = {
        counter: 0
    };

    const incrementAsyncFunction = (payload, callback) => {
        callback(null, payload);
    }

    const decrementAsyncFunction = (payload, callback) => {
        callback(null, payload);
    }

    const itype = 'INCREMENT';
    const itypeResponse = 'INCREMENT.RESPONSE';
    const itypeRequest = 'INCREMENT.REQUEST';
    const itypeError = 'INCREMENT.ERROR';

    const dtype = 'DECREMENT';
    const dtypeResponse = 'DECREMENT.RESPONSE';
    const dtypeRequest = 'DECREMENT.REQUEST';
    const dtypeError = 'DECREMENT.ERROR';


    var increment = new AsyncAction(itype, incrementAsyncFunction);
    var decrement = new AsyncAction(dtype, decrementAsyncFunction);


    var testReducer = new Reducer([
        {
            action: increment.response,
            reduce: (state, payload) => {
                state.counter += payload;
                return state;
            }
        },
        {
            action: decrement.response,
            reduce: (state, payload) => {
                state.counter -= payload;
                return state;
            }
        }
    ], initialState);

    var store = new Store(testReducer);

    store.dispatch(increment.payload(1));
    store.dispatch(increment.payload(2));
    store.dispatch(decrement.payload(2));

    it('getState', function () {
        assert.deepEqual(store.getState(), { counter: 1});
    });


});