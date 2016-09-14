import { Reducer } from '../../src/flux/reducer';
import { Action } from '../../src/flux/action';
import { Store } from '../../src/flux/store';
import { assert } from 'chai';

describe('CombinedStore', () => {

    const initialState = {
        counter: 0
    };

    const nameState = {
        name: "Willy"
    };

    const increment = new Action('INCREMENT');
    const decrement = new Action('DECREMENT');

    const changeName = new Action('CHANGE_NAME');
    const logName = new Action('LOG_NAME');

    var nameReducer = new Reducer([
        {
            action: changeName,
            reduce: (state, payload) =>{
                state.name = payload;
                return state;
            }
        },
        {
            action: logName,
            reduce: (state) =>{
            }
        }
    ], nameState);

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

    const store = new Store({math: testReducer, person: nameReducer});

    store.dispatch(changeName.payload("Corky"));
    store.dispatch(increment);
    store.dispatch(increment.payload());
    store.dispatch(decrement.payload());
    store.dispatch(logName.payload());

    it('getState', () => {
        assert.deepEqual(store.getState(), { global: {}, math: { counter: 1}, person: {name: 'Corky'}});
    });

});