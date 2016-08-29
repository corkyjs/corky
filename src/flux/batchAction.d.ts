import { IAction, Action, IPayloadedAction } from './action';

export declare class BatchAction<Payload> implements IAction<Payload> {

    constructor(type: string, actions: Array<IAction<Payload>>, payloadReducer?: (...args) => Payload);

    payload(...args);

}