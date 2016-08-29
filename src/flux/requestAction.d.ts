import { IAction, Action } from './action';
import { IAsyncAction } from './asyncAction';

export declare class RequestAction<Payload extends { data?: Object, query?: Object, url?: string, requestType?: string, template?: Object, options?: Object }, Respone> implements IAction<Payload>, IAsyncAction<Payload, Respone> {

    constructor(type: string, url: string, requestType: string, options?: any);

    request: Action<Payload>;

    response: Action<Respone>;

    error: Action<Error>;

    payload(payload: Payload);
}
