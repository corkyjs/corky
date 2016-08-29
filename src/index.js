import App from './app';
import { Element } from './tags/element';
import { mountMany, mountToManyDom, mount, mountToDom } from './tags/mount';
import { registerElement, registerService } from './tags/template';
import { Router } from './routing/Router';
import { Route } from './routing/Route';
import { Action } from './flux/action';
import { AsyncAction } from './flux/asyncAction';
import { BatchAction } from './flux/batchAction';
import { Reducer } from './flux/reducer';
import { RequestAction } from './flux/requestAction';
import { Service } from './flux/service';

export var Corky = {
    App,
    Tags: {
        Element,
        mountMany,
        mountToManyDom,
        mount,
        mountToDom,
        registerElement,
        registerService
    },
    Routing: {
        Route,
        Router
    },
    Flux: {
        Action,
        AsyncAction,
        BatchAction,
        Reducer,
        RequestAction,
        Service
    }

}

export default Corky;