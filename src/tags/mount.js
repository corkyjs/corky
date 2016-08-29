import * as Riot from 'riot';

export function mountMany(element, options) {
    return Riot.mount(element.prototype.tagName, options);
}

export function mountToManyDom(selector, element, options) {
    return Riot.mount(selector, element.prototype.tagName, options);
}

export function mount(element, options) {
    return Riot.mount(element.prototype.tagName, options)[0];
}

export function mountToDom(selector, element, options) {
    return Riot.mount(selector, element.prototype.tagName, options)[0];
}