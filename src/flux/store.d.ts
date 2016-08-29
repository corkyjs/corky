import {Reducer} from './reducer';
import { IAction } from './action';

export declare class Store<State>{

    constructor(reducer: Reducer<State>);

    constructor(reducer: any);

    getState(): State;

    dispatch(action: IAction<any>);

    subscribe(listener: any);
}