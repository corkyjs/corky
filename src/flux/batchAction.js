export class BatchAction {

    constructor(type, actions, payloadReducer) {
        this.type = type;
        this.actions = actions;
        this.payloadReducer = payloadReducer;
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
            if(this.actions){
                this.actions.forEach((action) => {
                    dispatch(action.payload(this.reduce(...args)))
                });
            }

        }

    }

}