export declare class Action<Payload> implements IAction<Payload> {

    constructor(type: string, payloadReducer?: (...args) => Payload);

    payload(...args);
}

export declare interface IAction<Payload> {

    payload(...args): IPayloadedAction<Payload>;

}

export declare interface IPayloadedAction<Payload>{

    type: string;

    payload: Payload;
}