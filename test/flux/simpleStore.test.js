import { Reducer } from '../../src/flux/reducer';
import { Action } from '../../src/flux/action';
import { Store } from '../../src/flux/store';
import { assert } from 'chai';

describe('SimpleStore', function () {

    const initialState = {
        counter: 0
    };

    const increment = new Action('INCREMENT');
    const decrement = new Action('DECREMENT');

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
        }
    ], initialState);

    const store = new Store(testReducer);
 
    store.dispatch(increment);
    store.dispatch(increment);
    store.dispatch(decrement);

    it('getState', function () {
        assert.deepEqual(store.getState(), { counter: 1});
    });

});