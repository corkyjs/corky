import { Reducer } from '../reducer';
import { Requests } from '../global';

export var reducer = new Reducer([
    {
        action: Requests.setAuthorization,
        reduce: (state, payload) => {
            state.authorization = payload.authorization;
        }
    },
    {
        action: Requests.removeAuthorization,
        reduce: (state) => {
            delete state.authorization;
        }
    },
    {
        action: Requests.setHost,
        reduce: (state, payload) => {
            state.host = payload.host;
        }
    },
    {
        action: Requests.removeHost,
        reduce: (state, payload) => {
            delete state.host;
        }
    }
], {});