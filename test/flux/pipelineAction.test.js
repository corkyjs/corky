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

    const asyncErrorFunction = (error, callback) => {
        callback(error, null);
    }

    const errorHandler = new Action('ERROR');

    const addAction = new AsyncAction('ADD', asyncFunction);
    const add1Action = new AsyncAction('ADD1', asyncFunction);
    const add2Action = new AsyncAction('ADD2', asyncFunction);

    const errorAction = new AsyncAction('ERROR_GENERATED', asyncErrorFunction);

    const pipelineAction = new PipelineAction('PIPE', [addAction, add1Action, add2Action], errorHandler);
    const pipeline1Action = new PipelineAction('PIPE1', [addAction, add1Action, errorAction], errorHandler);

    const initialState = {
        counter: 0
    };


    var testReducer = new Reducer([
        {
            action: addAction.request,
            reduce: (state, payload) => {
                state.counter += payload.number;
            }
        },
        {
            action: add1Action.request,
            reduce: (state, payload) => {
                state.counter += payload.number;
            }
        },
        {
            action: add2Action.request,
            reduce: (state, payload) => {
                state.counter += payload.number;
            }
        },
        {
            action: errorHandler,
            reduce: (state, payload) =>{
                state.error  = payload;
            }
        }
    ], initialState);

    it('Simple', (done) => {

        let store = new Store({ test: testReducer });

        store.dispatch(pipelineAction.payload([{number: 1},{number: 15},{number: 5}]));

        setTimeout(() => {
            assert.deepEqual(store.getState(), {global: {}, test: {counter: 21}});
            done();
        }, 100);
    });

    it('Error', (done) => {

        let store = new Store({ test: testReducer });

        store.dispatch(pipeline1Action.payload([{number: 1},{number: 15},"error"]));

        setTimeout(() => {
            assert.deepEqual(store.getState(), {global: {}, test: {counter: 16, error: "error"}});
            done();
        }, 100);
    });
    
});