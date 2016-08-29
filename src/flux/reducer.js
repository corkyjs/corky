const objectAssign = require('object-assign');

export class Reducer {

    constructor(handlers, defaultState) {
        this.handlers = handlers;
        this.defaultState = defaultState;
        return (state, action) => {
            if (state === undefined) state = defaultState;
            var handler = handlers.filter((handler) => {
                return handler.action.type === action.type;
            });
            if (handler.length >= 1){
                return objectAssign({}, state, handler[0].reduce(state, action.payload));
            } 
            return objectAssign({}, state);
        }

    }
}