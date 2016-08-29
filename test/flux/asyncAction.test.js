import { AsyncAction } from '../../src/flux/asyncAction';
import { assert } from 'chai';

describe('AsyncAction', () => {

    const payload = { test: true, value: 1 };
    const type = 'TEST';
    const typeResponse = 'TEST.RESPONSE';
    const typeRequest = 'TEST.REQUEST';
    const typeError = 'TEST.ERROR';
    const error = new Error('Something happend!');


    const asyncFunction = (payload, callback) => {
        callback(null, payload.value + 1);
    }

    const asyncErrorFunction = (payload, callback) => {
        callback(error, null);
    }

    it('createAsyncAction', () => {

        var action = new AsyncAction(type, asyncFunction);
        var payloadedAction = action.payload(payload);

        var result = [];

        var addToResult = function (action) {
            result.push(action);
        }

        payloadedAction(addToResult);

        assert(result, [{ type: typeRequest, payload: payload }, { type: typeResponse, payload: 2 }]);

    });

    it('createAsyncActionWithPayloadReducer', () => {

        var action = new AsyncAction(type, asyncFunction, (test, value) => ({ test, value }));
        var payloadedAction = action.payload(true, 1);
        var result = [];

        var addToResult = function (action) {
            result.push(action);
        }

        payloadedAction(addToResult);

        assert(result, [{ type: typeRequest, payload: payload }, { type: typeResponse, payload: 2 }]);

    });

    it('createErrorAsyncAction', () => {

        var action = new AsyncAction(type, asyncErrorFunction);
        var payloadedAction = action.payload(payload);

        var result = [];

        var addToResult = function (action) {
            result.push(action);
        }

        payloadedAction(addToResult);

        assert(result, [{ type: typeRequest, payload: payload }, { type: typeError, payload: error }]);

    });

    it('createErrorAsyncActionWithPayloadReducer', () => {

        var action = new AsyncAction(type, asyncErrorFunction, (test, value) => ({ test, value }));
        var payloadedAction = action.payload(true, 1);
        var result = [];

        var addToResult = function (action) {
            result.push(action);
        }

        payloadedAction(addToResult);

        assert.deepEqual(result, [{ type: typeRequest, payload: payload }, { type: typeError, payload: error }]);

    });

});