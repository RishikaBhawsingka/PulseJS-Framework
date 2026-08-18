export function h(type, props = {}, children = []) {
    return {
        type,
        props,
        children
    };
}

export function createElement(vnode) {
    if (typeof vnode === "string") {
        return document.createTextNode(vnode);
    }

    const el = document.createElement(vnode.type);

    // Props
   for (const key in vnode.props) {
    const value = vnode.props[key];

    if (key.startsWith("on") && typeof value === "function") {
        const event = key.slice(2).toLowerCase();
        el.addEventListener(event, value);
    } else {
        el.setAttribute(key, value);
    }
   }

    // Children
    vnode.children.forEach(child => {
        el.appendChild(createElement(child));
    });

    return el;
}

export function render(vnode, container) {
    const el = createElement(vnode);
    container.innerHTML = "";
    container.appendChild(el);
}

export function patch(oldVNode, newVNode, container) {
    const oldEl = container.firstChild;

    // 1. New node
    if (!oldVNode) {
        container.appendChild(createElement(newVNode));
        return;
    }

    // 2. Node removed
    if (!newVNode) {
        container.removeChild(oldEl);
        return;
    }

    // 3. Different types
    if (oldVNode.type !== newVNode.type) {
        container.replaceChild(createElement(newVNode), oldEl);
        return;
    }

    // 4. Text changed
    if (
        typeof oldVNode === "string" ||
        typeof newVNode === "string"
    ) {
        if (oldVNode !== newVNode) {
            oldEl.textContent = newVNode;
        }
        return;
    }

    // 5. Update props
    const oldProps = oldVNode.props || {};
    const newProps = newVNode.props || {};

    for (const key in newProps) {
        if (oldProps[key] !== newProps[key]) {
            oldEl.setAttribute(key, newProps[key]);
        }
    }

    for (const key in oldProps) {
        if (!(key in newProps)) {
            oldEl.removeAttribute(key);
        }
    }

    // 6. Update children
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];

    const max = Math.max(
        oldChildren.length,
        newChildren.length
    );

    for (let i = 0; i < max; i++) {

        const oldChild = oldChildren[i];
        const newChild = newChildren[i];

        if (!oldChild && newChild) {
            oldEl.appendChild(createElement(newChild));
        }

        else if (oldChild && !newChild) {
            oldEl.removeChild(oldEl.childNodes[i]);
        }

        else {
            patchChild(
                oldChild,
                newChild,
                oldEl.childNodes[i]
            );
        }
    }
}

function patchChild(oldVNode, newVNode, el) {

    // Text → Text
    if (
        typeof oldVNode === "string" &&
        typeof newVNode === "string"
    ) {
        if (oldVNode !== newVNode) {
            el.textContent = newVNode;
        }
        return;
    }

    // Text → Element
    if (
        typeof oldVNode === "string" ||
        typeof newVNode === "string"
    ) {
        el.replaceWith(createElement(newVNode));
        return;
    }

    // Different element
    if (oldVNode.type !== newVNode.type) {
        el.replaceWith(createElement(newVNode));
        return;
    }

    // Props
    const oldProps = oldVNode.props || {};
    const newProps = newVNode.props || {};

    for (const key in newProps) {
        if (oldProps[key] !== newProps[key]) {
            el.setAttribute(key, newProps[key]);
        }
    }

    for (const key in oldProps) {
        if (!(key in newProps)) {
            el.removeAttribute(key);
        }
    }

    // Children
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];

    const max = Math.max(
        oldChildren.length,
        newChildren.length
    );

    for (let i = 0; i < max; i++) {

        if (!oldChildren[i] && newChildren[i]) {
            el.appendChild(createElement(newChildren[i]));
        }

        else if (oldChildren[i] && !newChildren[i]) {
            el.removeChild(el.childNodes[i]);
        }

        else {
            patchChild(
                oldChildren[i],
                newChildren[i],
                el.childNodes[i]
            );
        }
    }
}