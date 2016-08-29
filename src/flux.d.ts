export declare namespace Flux {

    export class Action<Payload> implements IAction<Payload> {

        constructor(type: string, payloadReducer?: (...args) => Payload);

        payload(...args);

    }

    export interface IAction<Payload> {

        payload(...args): IPayloadedAction<Payload>;

    }

    export interface IPayloadedAction<Payload> {

        type: string;

        payload: Payload;

    }

    export class BatchAction<Payload> implements IAction<Payload> {

        constructor(type: string, actions: Array<IAction<Payload>>, payloadReducer?: (...args) => Payload);

        payload(...args);

    }

    export class AsyncAction<Payload, Respone> implements IAction<Payload>, IAsyncAction<Payload, Respone> {

        constructor(type: string, asyncFunction: (payload: Payload, callback: ICallback<Respone>) => void, payloadReducer?: (...args) => Payload);

        request: Action<Payload>;

        response: Action<Respone>;

        error: Action<Error>;

        payload(...args);


    }

    export interface IAsyncAction<Payload, Respone> extends IAction<Payload> {

        request: Action<Payload>;

        response: Action<Respone>;

        error: Action<Error>;

        payload(...args);

    }

    export interface ICallback<Response> {

        (err: Error, res: Response): void;

    }

    export class Reducer<State>{

        constructor(handlers: Array<IHandler<State, any>>, defaultState: State);

    }

    export interface IHandler<State, Payload> {

        action: Action<Payload>;

        reduce: (state: State, payload?: Payload) => State | void;
    }

    export class RequestAction<Payload extends { data?: Object, query?: Object, url?: string, requestType?: string, template?: Object, options?: Object }, Respone> implements IAction<Payload>, IAsyncAction<Payload, Respone> {

        constructor(type: string, url: string, requestType: string, options?: any);

        request: Action<Payload>;

        response: Action<Respone>;

        error: Action<Error>;

        payload(payload: Payload);
    }

    export abstract class Service {

        selector: (state) => Object;

        actions: Object;

        isContainer: boolean;
    }

    export class Store<State>{

        constructor(reducer: Reducer<State>);

        constructor(reducer: any);

        getState(): State;

        dispatch(action: IAction<any>);

        subscribe(listener: any);
    }

}


export default Flux;