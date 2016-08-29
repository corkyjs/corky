export declare namespace Corky {

    export default class App<State> {

        store: Flux.Store<State>

        container: Element;

        constructor(reducer: Flux.Reducer<State>);

        constructor(reducer: any);

        init(htmlSelector: string, container: any);

        getState(): State;

        dispatch(action: Flux.IAction<any>);

        subscribe(listener: any);

        setRouter(routes: Array<Routing.Route>, initialAdress?: string, options?: Routing.IOptions);

        redirect(address: string);

    }

    namespace Flux {

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

    namespace Routing {

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

    namespace Tags {

        export interface IHtmlRiotElement extends HTMLElement {

            _tag: Element;
        }

        export abstract class Element {

            static createElement(options?: any): IHtmlRiotElement;

            constructor();

            services: any;

            router: { redirect: (address) => void }

            static include(): void;

            update(): void;

            update(data: any): void;

            mount(): void;

            unmount(keepTheParent: boolean): void;

            abstract mounted(): void;

            abstract beforeMounted(): void;

            abstract unmounted(): void;

            abstract beforeUnmounted(): void;

            abstract updating(): void;

            abstract updated(): void;

            on(events: string, callback: Function): void;

            one(events: string, callback: Function): void;

            off(events: string): void;

            trigger(eventName: string, err: Error, data: any): void;

            opts: any;

            parent: Element;

            root: HTMLElement;

            tags: any;

            tagName: string;

            template: string;

            isMounted: boolean;
        }

        export function mountMany(element: any, options?: any): Array<Element>;

        export function mountToManyDom(selector: any, element: any, options?: any): Array<Element>;

        export function mount(element: any, options?: any): Element;

        export function mountToDom(selector: any, element: any, options?: any): Element;

        export function registerElement(element: any, template: string, tags: { [fileName: string]: any });

        export function registerService(element: any, api: any);

    }

}


export default Corky;