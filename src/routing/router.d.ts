import { IRoute } from './route';
import { Store } from '../flux/store';

export class Router {

    constructor(routes: Array<IRoute>);

    routes: Array<IRoute>;

    init(initAddress: string);

    redirect(address: string);
}

export type Recurse = 'forward' | 'backward' | 'false';

export interface IOptions {

    recurse?: Recurse;

    strict?: boolean;

    async?: boolean;

    delimiter?: string;

    notfound?: Function;

    on?: Function;

    before?: Function;

    after?: Function;

    html5history?: boolean;

    run_handler_in_init?: boolean;

    convert_hash_in_init?: boolean;
}