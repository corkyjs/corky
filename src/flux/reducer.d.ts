import { Action, IAction } from './action';

export declare class Reducer<State>{

    constructor(handlers: Array<IHandler<State, any>>, defaultState: State);

}

export declare interface IHandler<State, Payload> {

    action: Action<Payload>;

    reduce: (state: State, payload?: Payload) => State | void;
}