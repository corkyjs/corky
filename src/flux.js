import {Action} from './flux/action';
import {AsyncAction} from './flux/asyncAction';
import {Reducer} from './flux/reducer';
import {RequestAction} from './flux/requestAction';
import {BatchAction} from './flux/batchAction';
import {Service} from './flux/service';

export var Flux = {
    Action,
    AsyncAction,
    BatchAction,
    Reducer,
    RequestAction,
    Service
};


export default Flux;
