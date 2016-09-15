import { AsyncAction } from '../../src/flux/asyncAction';
import { PipelineAction } from '../../src/flux/pipelineAction';
import { Action } from '../../src/flux/action';
import { Reducer } from '../../src/flux/reducer';
import { Store } from '../../src/flux/store';
import { assert } from 'chai';

describe.only('PipelineAction', () => {

    const asyncFunction = (payload, callback) => {
        callback(null, payload);
    }

    const asyncErrorFunction = (payload, callback) => {
        callback(error, null);
    }

    const errorHandler = new Action('ERROR');

    const addAction = new AsyncAction('ADD', asyncFunction);
    const add1Action = new AsyncAction('ADD1', asyncFunction);
    const add2Action = new AsyncAction('ADD2', asyncFunction);

    const pipelineAction = new PipelineAction('PIPE', [addAction, add1Action, add2Action], errorHandler);

    const initialState = {
        counter: 0
    };


    var testReducer = new Reducer([
        {
            action: addAction.request,
            reduce: (state, payload) => {
                console.log(payload);
            }
        },
        {
            action: add1Action.request,
            reduce: (state, payload) => {
                console.log(payload);
            }
        },
        {
            action: add2Action.request,
            reduce: (state, payload) => {
                console.log(payload);
            }
        },
    ], initialState);

    var store = new Store({ test: testReducer });

    it('simpletest', (done) => {

        store.dispatch(pipelineAction.payload({a: 3}));

        setTimeout(() => {
            assert.deepEqual(store.getState(), {global: {}});
            done();
        }, 100);
    });
    
});