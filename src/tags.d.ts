export declare namespace Tags {

    export interface IHtmlRiotElement extends HTMLElement {

        _tag: Element;
    }

    export abstract class Element {

        static createElement(options?: any): IHtmlRiotElement;

        constructor();

        services: any;

        router: { redirect: (address) => void }

        static include(): void;

        update(): void;

        update(data: any): void;

        mount(): void;

        unmount(keepTheParent: boolean): void;

        abstract mounted(): void;

        abstract beforeMounted(): void;

        abstract unmounted(): void;

        abstract beforeUnmounted(): void;

        abstract updating(): void;

        abstract updated(): void;

        on(events: string, callback: Function): void;

        one(events: string, callback: Function): void;

        off(events: string): void;

        trigger(eventName: string, err: Error, data: any): void;

        opts: any;

        parent: Element;

        root: HTMLElement;

        tags: any;

        tagName: string;

        template: string;

        isMounted: boolean;
    }

    export function mountMany(element: any, options?: any): Array<Element>;

    export function mountToManyDom(selector: any, element: any, options?: any): Array<Element>;

    export function mount(element: any, options?: any): Element;

    export function mountToDom(selector: any, element: any, options?: any): Element;

    export function registerElement(element: any, template: string, tags: { [fileName: string]: any });

    export function registerService(element: any, api: any);

}


export default Tags;