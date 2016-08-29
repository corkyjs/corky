export class Action {

    constructor(type, payloadReducer) {
        this.type = type;
        this.payloadReducer = payloadReducer;
    }

    payload(...args) {
        if (this.payloadReducer) {
            return {
                type: this.type,
                payload: this.payloadReducer(...args)
            }
        } else {
            return {
                type:this. type,
                payload: args[0]
            }
        }

    }
}