import { Action } from './action';

export class AsyncAction {

    constructor(type, asyncFunction, payloadReducer) {
        this.type = type;
        this.asyncFunction = asyncFunction;
        this.payloadReducer = payloadReducer;
        this.request = new Action(`${type}.REQUEST`, payloadReducer);
        this.response = new Action(`${type}.RESPONSE`);
        this.error = new Action(`${type}.ERROR`);
    }

    reduce(...args) {
        if (this.payloadReducer) {
            return this.payloadReducer(...args);
        } else {
            return args[0];
        }
    }

    payload(...args) {
        return (dispatch) => {
            dispatch(this.request.payload(...args));
            this.asyncFunction(this.reduce(...args), (err, res) => {
                if (err !== null) {
                    dispatch(this.error.payload(err));
                    if(this.afterError) this.afterError(dispatch, err);
                } else {
                    dispatch(this.response.payload(res));
                    if(this.afterResponse) this.afterResponse(dispatch, res);
                }
            });
        }
    }
}