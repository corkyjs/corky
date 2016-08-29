import { IAction, Action, IPayloadedAction } from './action';

export declare class AsyncAction<Payload, Respone> implements IAction<Payload>, IAsyncAction<Payload, Respone> {

    constructor(type: string, asyncFunction:  (payload: Payload, callback: ICallback<Respone>) => void,  payloadReducer?: (...args) => Payload);

    request: Action<Payload>;

    response: Action<Respone>;

    error: Action<Error>;

    payload(...args);
}

export declare interface IAsyncAction<Payload, Respone> extends IAction<Payload> {

    request: Action<Payload>;

    response: Action<Respone>;

    error: Action<Error>;

    payload(...args);

}

export declare interface ICallback<Response> {

    (err: Error, res: Response): void;
    
}