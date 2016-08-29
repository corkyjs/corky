import { Element } from './tags/element';
import { mountMany, mountToManyDom, mount, mountToDom } from './tags/mount';
import { registerElement, registerService } from './tags/template';

export var Tags = {
    Element,
    mountMany,
    mountToManyDom,
    mount,
    mountToDom,
    registerElement,
    registerService
}

export default Tags;