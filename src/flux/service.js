"use strict";
var Service = (function () {
    function Service() {
        this.actions = {};
        this.isContainer = false;
    }
    Service.prototype.init = function () {
        if (this.selector !== undefined) {
            var data = this.selector(this.store.getState());
        }
        var actions = this.actions;
        var selector = this.selector;
        var store = this.store;
        var isContainer = this.isContainer;

        this.on('mount', function () {
            var _this = this;
            if (data !== undefined) {
                Object.keys(data).forEach(function (key) {
                    _this[key] = data[key];
                });
            }
            if (actions !== undefined) {
                Object.keys(actions).forEach(function (actionName) {
                    _this[actionName] = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        if (window.Event && window.Event.prototype.isPrototypeOf(args[0])) {
                            args[0].preventUpdate = true;
                        }
                        return store.dispatch(actions[actionName].apply(actions, args));
                    };
                });
            }
            _this.on('update', function () {
                if (selector !== undefined) {
                    var data = selector(store.getState());
                }
                if (data !== undefined) {
                    Object.keys(data).forEach(function (key) {
                        _this[key] = data[key];
                        if (typeof data[key] == 'function')
                            _this.update();
                    });
                }
                if (isContainer) _this.update();
            });

            store.subscribe(function () {
                if (isContainer) _this.update();
            });
            _this.update();
        });
    };
    return Service;
} ());
exports.Service = Service;