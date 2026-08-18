/*export class Router {
    constructor(routes) {
        this.routes = routes;
    }

    navigate(path) {
        history.pushState({}, "", path);
        this.resolve();
    }

    resolve() {
        const path = window.location.pathname;

        for (const route of this.routes) {
            const match = this.matchRoute(route.path, path);

            if (match) {
                route.component(match);
                return;
            }
        }

        console.log("404 - Page not found");
    }

    matchRoute(routePath, actualPath) {
        const routeParts = routePath.split("/");
        const pathParts = actualPath.split("/");

        if (routeParts.length !== pathParts.length) {
            return null;
        }

        const params = {};

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(":")) {
                params[routeParts[i].slice(1)] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
                return null;
            }
        }

        return params;
    }

    start() {
        window.addEventListener("popstate", () => {
            this.resolve();
        });

        this.resolve();
    }
}*/
export class Router {
    constructor(routes) {
        this.routes = routes;
    }

    navigate(path) {
        history.pushState({}, "", path);
        this.resolve();
    }

    resolve() {
        const path = window.location.pathname;

        for (const route of this.routes) {
            const params = this.matchRoute(route.path, path);

            if (params) {
                route.component(params);
                return;
            }
        }

        console.log("404 - Page not found");
    }

    matchRoute(routePath, actualPath) {
        const routeParts = routePath.split("/");
        const pathParts = actualPath.split("/");

        if (routeParts.length !== pathParts.length) {
            return null;
        }

        const params = {};

        for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(":")) {
                params[routeParts[i].slice(1)] = pathParts[i];
            } 
            else if (routeParts[i] !== pathParts[i]) {
                return null;
            }
        }

        return params;
    }

    start() {
        window.addEventListener("popstate", () => {
            this.resolve();
        });

        this.resolve();
    }
}