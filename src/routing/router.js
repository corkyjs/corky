var director = require('director');
import { Route } from './route';

export class Router {

    constructor(routes) {
        this.routes = routes;
        if (routes != undefined) {
            this._router = new director.Router(this.transform(routes));
        }
    }

    transform(routes) {
        var result = {};
        for (var route in routes) {
            if (routes[route].address !== undefined && routes[route].on !== undefined) {
                result[routes[route].address] = {};
                result[routes[route].address].on = routes[route].on;
                if(routes[route].after !== undefined) result[routes[route].address].after = routes[route].after;
                if(routes[route].before !== undefined) result[routes[route].address].before = routes[route].before;
                if(routes[route].once !== undefined) result[routes[route].address].once = routes[route].once;

                if(routes[route].transform === undefined){
                    routes[route]  = new Route(routes[route]);
                }

                routes[route].transform(result[routes[route].address]);
            }

        }
        return result;

    }

    init(initAddress){
        this._router.init(initAddress);
    }

    redirect(address){
        this._router.setRoute(address);
    }

    configure(options){
        this._router.configure(options);
    }

}