import { Action } from './action';

export class SequencedAction {

    constructor(type, actions, errorHandlingAction, payloadReducer) {
        this.type = type;
        this.actions = actions;
        this.payloadReducer = payloadReducer;
        this.errorHandler = errorHandlingAction;
        this.start = new Action(`${type}.START`);
        this.end = new Action(`${type}.END`);
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
            dispatch(this.start.payload(...args));
            if(this.actions && this.errorHandler) {
                for (var i = 0; i < this.actions.length; i++) { 
                    let actionNo = i;
                    if( i < this.actions.length-1) {
                        this.actions[actionNo].afterResponse = (dispatch, res) => {
                            dispatch(this.actions[actionNo+1].payload(this.reduce(...args)[actionNo+1]));
                        }
                    } else {
                        this.actions[actionNo].afterResponse = (dispatch, res) => {
                            dispatch(this.end.payload(...args));
                        }
                    }
                    this.actions[i].afterError = (dispatch, err) => {
                        dispatch(this.errorHandler.payload(err));
                    }

                }
            }
            dispatch(this.actions[0].payload(this.reduce(...args)[0]));
        }
    }

}