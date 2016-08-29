import { Action }from '../../src/flux/action';
import { assert } from 'chai';

describe('Action', () => {

    const payload = { test: true, value: 'ABC' };
    const type = 'TEST';
    const test = true;
    const value = 'ABC';

    it('createAction', () => {
        var action = new Action(type);
        var payloadedAction = action.payload(payload);
        assert(payloadedAction, { type: type, payload: payload });
    });


    it('createActionWithPayloadReducer', () => {
        var payloadReducer = (test, value) => ({ test, value });
        var action = new Action(type, payloadReducer);
        var payloadedAction = action.payload(test, value);
        assert.deepEqual(payloadedAction, { type: type, payload: payload });
    });

});