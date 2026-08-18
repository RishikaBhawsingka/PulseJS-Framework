/*import { reactive } from "./core/reactive.js";
import { effect } from "./core/effect.js";
import { h , createElement, render , patch } from "./core/vdom.js";

const state = reactive({
    count: 0
});

effect(() => {
    console.log("Count:", state.count);
});

state.count++;
state.count++;
state.count++;
console.log("Finished");


const vnode = h("h1", {}, ["Hello PulseJS"]);

const app = document.getElementById("app");

app.appendChild(createElement(vnode));

render(vnode, app);
const app = document.getElementById("app");

let oldVNode = h("h1", {}, ["Count: 0"]);

render(oldVNode, app);

setTimeout(() => {
    const newVNode = h("h1", {}, ["Count: 1"]);

    patch(oldVNode, newVNode, app);

    oldVNode = newVNode;
}, 2000);*/
//testing 2
/*import { h, render, patch } from "./core/vdom.js";

const app = document.getElementById("app");

let oldVNode = h("div", { class: "box" }, [
    h("h1", {}, ["PulseJS"]),
    h("p", {}, ["Count: 0"])
]);

render(oldVNode, app);

setTimeout(() => {

    const newVNode = h("div", { class: "box" }, [
        h("h1", {}, ["PulseJS"]),
        h("p", {}, ["Count: 1"]),
        h("button", {}, ["Click Me"])
    ]);

    patch(oldVNode, newVNode, app);

    oldVNode = newVNode;

}, 2000);*/
//Testing final - 0 - 1-2-3 full
/*import { reactive } from "./core/reactive.js";
import { h } from "./core/vdom.js";
import { Component } from "./core/component.js";

class App extends Component {

    constructor() {
        super();

        this.state = reactive({
            count: 0
        });
    }

    render() {
        return h("div", {}, [
            h("h1", {}, ["PulseJS"]),
            h("p", {}, [`Count: ${this.state.count}`])
        ]);
    }

    onMount() {
        console.log("App mounted");
    }

    onUpdate() {
        console.log("App updated");
    }
}

const app = document.getElementById("app");

const component = new App();

component.mount(app);

setTimeout(() => {
    component.state.count++;
}, 1000);

setTimeout(() => {
    component.state.count++;
}, 2000);

setTimeout(() => {
    component.state.count++;
}, 3000);*/
//event bus testing
/*
 import { EventBus } from "./core/eventBus.js";

const bus = new EventBus();

bus.on("message", data => {
    console.log("Received:", data);
});

bus.emit("message", "Hello PulseJS!"); */
/*import { Router } from "./core/router.js";

const router = new Router([
    {
        path: "/",
        component: () => console.log("HOME")
    },
    {
        path: "/dashboard",
        component: () => console.log("DASHBOARD")
    },
    {
        path: "/user/:id",
        component: params => {
            console.log("USER ID:", params.id);
        }
    }
]);

router.start();

router.navigate("/user/123");    
router.navigate("/user/456"); */
/*import { Dashboard } from "./demo/dashboard.js";
import { Analytics } from "./demo/analytics.js";
import { Router } from "./core/router.js";

const app = document.getElementById("app");

let currentComponent = null;

const router = new Router([
    {
        path: "/",
        component: () => {
            currentComponent?.unmount();

            currentComponent = new Dashboard();
            currentComponent.mount(app);
        }
    },
    {
        path: "/analytics",
        component: () => {
            currentComponent?.unmount();

            currentComponent = new Analytics();
            currentComponent.mount(app);
        }
    }
]);

router.start();
setTimeout(() => {
    router.navigate("/analytics");
}, 2000);*/
/*import { createAppRouter } from "./demo/router.js";

const app = document.getElementById("app");

const router = createAppRouter(app);

window.pulseRouter = router;

router.start();*/

import { createApp } from "./core/app.js";
import { createAppRouter } from "./demo/router.js";

const router = createAppRouter();

const app = createApp(router);

app.mount("#app");

window.pulseRouter = router;

