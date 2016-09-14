import { Action } from './action';

export const Requests = {
    setAuthorization: new Action('AUTHENTICATION_SET'),
    removeAuthorization: new Action('AUTHENTICATION_REMOVED'),
    setHost: new Action('HOST_SET'),
    removeHost: new Action('HOST_REMOVED')
}