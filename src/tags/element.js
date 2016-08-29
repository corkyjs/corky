"use strict";
var Riot = require('riot');
var Element = (function () {
    function Element() {
        if (this.load)
            this.load();
    }
    Element.createElement = function (options) {
        var tagName = this.prototype.tagName;
        var el = document.createElement(tagName);
        Riot.mount(el, tagName, options);
        return el;
    };
    Element.prototype.update = function (data) { };
    Element.prototype.mount = function () { };
    Element.prototype.unmount = function (keepTheParent) { };
    Element.prototype.on = function (events, callback) { };
    Element.prototype.one = function (events, callback) { };
    Element.prototype.off = function (events) { };
    Element.prototype.trigger = function (eventName, err, data) { };
    return Element;
}());
exports.Element = Element;
