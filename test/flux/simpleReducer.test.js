import { Reducer } from '../../src/flux/reducer';
import { Action } from '../../src/flux/action';
import { Store } from '../../src/flux/store';
import { assert } from 'chai';


describe('Reducer', () => {

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


    it('increment', () => {
        assert.deepEqual(testReducer({ counter: 1, abc: 3 }, increment.payload()), { counter: 2, abc: 3 });
    });

    it('decrement', () => {
        assert.deepEqual(testReducer(undefined, decrement.payload()), { counter: -1 });
    });
});