"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerService = registerService;
exports.registerElement = registerElement;

var _riot = require("riot");

var Riot = _interopRequireWildcard(_riot);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function extend(d, element) {
    var map = Object.keys(element.prototype).reduce(function (descriptors, key) {
        descriptors[key] = Object.getOwnPropertyDescriptor(element.prototype, key);
        return descriptors;
    }, {});
    Object.defineProperties(d, map);
}

function registerService(element, service) {
    element.prototype.load = function () {
       // this.mixin(service);

        
        var actions = service.actions;
        var selector = service.selector;
        var store = this.store;
        var isContainer = service.isContainer;
        service.ensureSubscription(store);
         var _this = this;
        if(service.isContainer){
            store.subscribe( function(){
                _this.update();
            });
        }
        this.on('mount', function () {           
            if (service.selectorData !== undefined) {
                Object.keys(service.selectorData).forEach(function (key) {
                    _this[key] = service.selectorData[key];
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
                if (service.selectorData !== undefined) {
                    Object.keys(service.selectorData).forEach(function (key) {
                        _this[key] = service.selectorData[key];
                        if (typeof service.selectorData[key] == 'function') _this.update();
                    });
                }
                if (isContainer) _this.update();
            });
            _this.update();
        });
    };
}

function registerElement(element, template, precompiledTags) {

    element.prototype["template"] = template;
    function registerTag(compiledTag) {

        var transformFunction = function transformFunction(opts) {
            extend(this, element);
            element.apply(this, [opts]);

            if (element.prototype.mounted !== undefined) this.on("mount", this.mounted);
            if (element.prototype.beforeMounted !== undefined) this.on("before-mount", this.beforeMounted);
            if (element.prototype.unmounted !== undefined) this.on("unmount", this.unmounted);
            if (element.prototype.beforeUnmounted !== undefined) this.on("before-unmount", this.beforeUnmounted);
            if (element.prototype.updating !== undefined) this.on("update", this.updating);
            if (element.prototype.updated !== undefined) this.on("updated", this.updated);
        };

        Riot.tag2(compiledTag.tagName, compiledTag.html, compiledTag.css, compiledTag.attribs, transformFunction, Riot.settings.brackets);

        return compiledTag.tagName;
    }

    var compiled;

    if (element.prototype.template !== undefined) {
        var tagTemplate = element.prototype.template;
        if (precompiledTags[tagTemplate] !== undefined) {
            compiled = precompiledTags[tagTemplate];
        } else {
            throw "template property not valid";
        }
        element.prototype.tagName = registerTag(compiled);
    } else throw "template property not specified";
}