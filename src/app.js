import { Store } from './flux/store';
import { Router } from './routing/router';
import { mountToDom } from './tags/mount';
import * as Riot from 'riot';

export default class App {

    setRouter(routes, initialAdrress = '/', options) {
        this.router = new Router(routes);
        if (options != undefined) this.router.configure(options);
        this.router.init(initialAdrress);
        var riotRedux = function riotRedux(router) {

            function init() {
                this.router = router;
            }

            return { init };
        };
        Riot.mixin(riotRedux(this.router));
    }

    init(selector, container) {
        this.container = mountToDom(selector, container);
    }

    constructor(reducer) {
        this.store = new Store(reducer);
        var riotRedux = function (store) {

            function init() {
                this.store = store;
            }

            return { init };
        }

        Riot.mixin(riotRedux(this.store));

    }

    redirect(address) {
        this.router.redirect(address);
    }

    dispatch(action) {
        this.store.dispatch(action);
    }

    getState() {
        return this.store.getState();
    }

    subscribe(listener) {
        return this.store.subscribe(listener);
    }
}