import { Store } from '../../../src/flux/store';
import { Requests } from '../../../src/flux/global';
import { assert } from 'chai';

describe('Reducer', () => {

    it('setHost', (done) => {
        let store = new Store({});
        store.dispatch(Requests.setHost.payload({ host: "https://corkyjs.github.io/" }));
        setTimeout(() => {
            assert.deepEqual(store.getState(), {global: {host: "https://corkyjs.github.io/"}});
            done();
        }, 100);
    });

    it('removeHost', (done) => {
        let store = new Store({});
        store.dispatch(Requests.setHost.payload({ host: "https://corkyjs.github.io/" }));
        store.dispatch(Requests.removeHost.payload());
        setTimeout(() => {
            assert.deepEqual(store.getState(), {global: {}});
            done();
        }, 100);
    });

    it('setAuthorization', (done) => {
        let store = new Store({});
        store.dispatch(Requests.setAuthorization.payload({ authorization: "Basic Q29ya3k6U2hhbW9vMTIz" }));
        setTimeout(() => {
            assert.deepEqual(store.getState(), { global: { authorization: "Basic Q29ya3k6U2hhbW9vMTIz"}});
            done();
        }, 100);
    });

    it('removeAuthorization', (done) => {
        let store = new Store({});
        store.dispatch(Requests.setAuthorization.payload({ authorization: "Basic Q29ya3k6U2hhbW9vMTIz" }));
        store.dispatch(Requests.removeAuthorization.payload());
        setTimeout(() => {
            assert.deepEqual(store.getState(), {global: {}});
            done();
        }, 100);
    });

});