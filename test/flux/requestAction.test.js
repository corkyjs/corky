var RequestAction = require('../../src/flux/requestAction');
import { assert } from 'chai';

describe('RequestAction', () => {

    var jsonServer = require('json-server');
    var server = jsonServer.create();
    var router = jsonServer.router('../db.json');
    var middlewares = jsonServer.defaults();


    const response = { "id": 1, "title": "json-server", "author": "typicode" };

    server.get('/post', function (req, res) {
        res.jsonp(response);
    })
    server.use(middlewares);
    server.use(router);
    server.listen(3000, function () {
    });

    const getUrl = 'http://127.0.0.1:3000/post';
    const getErrorUrl = 'http://localhost:3000/posts/abc';
    const templateUrl = 'http://{host}/{post}';

    const requestType = 'GET';
    const type = 'TEST';
    const typeResponse = 'TEST.RESPONSE';
    const typeRequest = 'TEST.REQUEST';
    const typeError = 'TEST.ERROR';



    it('createRequestAction', (done) => {

        var action = new RequestAction.RequestAction(type, getUrl, requestType);

        var payloadedAction = action.payload();
        var result = [];

        var addToResult = function (action) {
            result.push(action);
        }

        payloadedAction(addToResult);


        setTimeout(function () {
            assert(result, [{ type: typeRequest, payload: undefined }, { type: typeResponse, payload: response }]);
            done();
        }, 100);

    });

    it('createTemplateRequestAction', (done) => {

        var action = new RequestAction.RequestAction(type, templateUrl, requestType);

        var payloadedAction = action.payload({ template: { post: 'post', host: '127.0.0.1:3000' } });
        var result = [];

        var addToResult = function (action) {
            result.push(action);
        }

        payloadedAction(addToResult);


        setTimeout(function () {
            assert.deepEqual(result, [{ type: typeRequest, payload: {data: {}, query: {}} }, { type: typeResponse, payload: response }]);
            done();
        }, 100);

    });

    it('createErrorRequestAction', (done) => {

        var action = new RequestAction.RequestAction(type, getErrorUrl, requestType);

        var payloadedAction = action.payload();
        var result = [];

        var addToResult = function (action) {
            result.push(action);
        }

        payloadedAction(addToResult);


        setTimeout(function () {
            assert.deepEqual(result[0], { type: typeRequest, payload: { data: {}, query: {} } });
            assert.deepEqual(result[1].type, typeError);
            assert.deepEqual(result[1].payload !== undefined, true);
            done();
        }, 100);

    });

});