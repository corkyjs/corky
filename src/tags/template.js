import * as Riot from 'riot';

function extend(d, element) {
    var map = Object.keys(element.prototype).reduce((descriptors, key) => {
        descriptors[key] = Object.getOwnPropertyDescriptor(element.prototype, key);
        return descriptors;
    }, {});
    Object.defineProperties(d, map);
}


export function registerService(element, service) {
    element.prototype.load = function () {
      //  this.mixin(service);
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
    }
}

export function registerElement(element, template, precompiledTags) {

    element.prototype["template"] = template;
    function registerTag(compiledTag) {

        var transformFunction = function (opts) {
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
        let tagTemplate = element.prototype.template;
        if (precompiledTags[tagTemplate] !== undefined) {
            compiled = precompiledTags[tagTemplate];
        } else {
            throw "template property not valid";
        }
        element.prototype.tagName = registerTag(compiled);
    } else throw "template property not specified";
}