export declare namespace Routing {

    export interface IRoute {

        subroutes?: Array<IRoute>;

        address: string;

        on: (...args) => void;

        before?: (...args) => void;

        after?: (...args) => void;

        once?: (...args) => void;
    }

    export class Route implements IRoute {

        constructor(route: IRoute);

        subroutes: Array<IRoute>;

        address: string;

        on: (...args) => void;

        before: (...args) => void;

        after: (...args) => void;

        once: (...args) => void;

    }

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

}

export default Routing;