import { IAction } from '../flux/action'
 
/**
 * 
 * 
 * @export
 * @interface IRoute
 */
export interface IRoute{
    /**
     * 
     * 
     * @type {Array<IRoute>}
     */
    subroutes?: Array<IRoute>;
    /**
     * 
     * 
     * @type {string}
     */
    address: string;

    /**
     * 
     */
    on: (...args) => void;
    /**
     * 
     */
    before?: (...args) => void;
    /**
     * 
     */
    after?: (...args) => void;
    /**
     * 
     */
    once?: (...args) => void;
}

/**
 * 
 * 
 * @export
 * @class Route
 * @implements {IRoute}
 */
export class Route implements IRoute{
    /**
     * Creates an instance of Route.
     * 
     * @param {IRoute} route
     */
    constructor(route: IRoute);

    /**
     * 
     * 
     * @type {Array<IRoute>}
     */
    subroutes: Array<IRoute>;
    /**
     * 
     * 
     * @type {string}
     */
    address: string;

    /**
     * 
     */
    on: (...args) => void;
    /**
     * 
     */
    before: (...args) =>  void;
    /**
     * 
     */
    after: (...args) => void;
    /**
     * 
     */
    once: (...args) => void;
}
