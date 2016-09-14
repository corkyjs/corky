import { Reducer } from '../../src/flux/reducer';
import { Action } from '../../src/flux/action';
import { Store } from '../../src/flux/store';
import { assert } from 'chai';

describe('SimpleStore', () => {

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

    const store = new Store({test: testReducer});
 
    store.dispatch(increment);
    store.dispatch(increment);
    store.dispatch(decrement);

    it('getState', () => {
        assert.deepEqual(store.getState(), {test: { counter: 1}, global: {}});
    });

});