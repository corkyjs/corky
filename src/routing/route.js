export class Route {
    constructor(route) {
        this.subroutes = route && route.subroutes || undefined;
        this.address = route && route.address || undefined;
        this.on = route && route.on || undefined;
        this.before = route && route.before || undefined;
        this.after = route && route.after || undefined;
        this.once = route && route.once || undefined;
    }

    transform(result) {
        for (var route in this.subroutes) {
            if (this.subroutes[route].address !== undefined && this.subroutes[route].on !== undefined) {
                result[this.subroutes[route].address] = {};
                result[this.subroutes[route].address].on = this.subroutes[route].on;
                if (this.subroutes[route].after !== undefined) result[this.subroutes[route].address].after = this.subroutes[route].after;
                if (this.subroutes[route].before !== undefined) result[this.subroutes[route].address].before = this.subroutes[route].before;
                if (this.subroutes[route].once !== undefined) result[this.subroutes[route].address].once = this.subroutes[route].once;

                if (this.subroutes[route].transform === undefined) {
                    this.subroutes[route] = new Route(this.subroutes[route]);
                }
                this.subroutes[route].transform(result[this.subroutes[route].address]);
            }
        }

    }

}