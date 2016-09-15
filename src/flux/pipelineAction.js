export class PipelineAction {

    constructor(type, actions, errorHandlingAction, payloadReducer) {
        this.type = type;
        this.actions = actions;
        this.payloadReducer = payloadReducer;
        this.errorHandler = errorHandlingAction;
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
            if(this.actions && this.errorHandler) {
                for (var i = 0; i < this.actions.length; i++) { 
                    if( i < this.actions.length-1) {
                        let a = i;
                        this.actions[i].afterResponse = (dispatch) => {
                            console.log(a, this.actions[a+1]);
                            dispatch(this.actions[a+1].payload(...args));
                        }
                    }
                    this.actions[i].afterError = (dispatch, err) => {
                        dispatch(this.errorHandler.payload(err));
                    }

                }
            }
            dispatch(this.actions[0].payload(...args));
        }
    }

}