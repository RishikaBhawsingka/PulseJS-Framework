import { render, patch } from "./vdom.js";
import { effect } from "./effect.js";

export class Component {
    constructor(props = {}) {
        this.props = props;
        this.isMounted = false;
        this.vnode = null;
        this.container = null;
    }

    render() {
        return null;
    }

    mount(container) {
        this.container = container;

        effect(() => {
            const newVNode = this.render();

            if (!this.isMounted) {
                this.vnode = newVNode;
                render(newVNode, container);
                this.isMounted = true;

                if (this.onMount) this.onMount();
            } else {
                patch(this.vnode, newVNode, container);
                this.vnode = newVNode;

                if (this.onUpdate) this.onUpdate();
            }
        });
    }

    unmount() {
    if (!this.isMounted) return;

    this.container.innerHTML = "";
    this.isMounted = false;

    if (this.onUnmount) {
        this.onUnmount();
    }
   }
}