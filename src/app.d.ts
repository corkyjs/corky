import { Store } from './flux/store';
import { Element } from './tags/element';
import { Reducer } from './flux/reducer'
import { Router, IOptions } from './routing/router';
import { Route, IRoute } from './routing/route';
import { IAction } from './flux/action';

export default class App<State> {

    store: Store<State>

    container: Element;

    constructor(reducer: Reducer<State>);

    constructor(reducer: any);

    init(htmlSelector: string, container: any);

    getState(): State;

    dispatch(action: IAction<any>);

    subscribe(listener: any);

    setRouter(routes: Array<Route>, initialAdress?: string, options?: IOptions);

    redirect(address: string);

}