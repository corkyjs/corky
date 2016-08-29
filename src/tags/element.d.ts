export interface IHtmlRiotElement extends HTMLElement {

    _tag: Element;
}

export declare abstract class Element {

    static createElement(options?: any): IHtmlRiotElement;

    constructor();

    services: any;
    
    router: { redirect: (address) => void }

    static include(): void;

    update(): void;

    update(data: any): void;

    mount(): void;

    unmount(keepTheParent: boolean): void;

    on(events: string, callback: Function): void;

    one(events: string, callback: Function): void;

    off(events: string): void;

    trigger(eventName: string, err: Error, data: any): void;

    abstract mounted():void;

    abstract beforeMounted(): void;

    abstract unmounted(): void;

    abstract beforeUnmounted(): void;

    abstract updating(): void;
    
    abstract updated(): void;

    opts: any;

    parent: Element;

    root: HTMLElement;

    tags: any;

    tagName: string;

    template: string;

    isMounted: boolean;
}
