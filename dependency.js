import { activeEffect } from "./effect.js";
import { schedule } from "./scheduler.js";
const targetMap = new WeakMap();

export function track(target, property) {
    let depsMap = targetMap.get(target);
      if (!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    let deps = depsMap.get(property);
     if (!deps) {
        deps = new Set();
        depsMap.set(property, deps);
    }

    if (activeEffect) {
        deps.add(activeEffect);
    }
}

export function trigger(target, property) {
    const depsMap = targetMap.get(target);

    if (!depsMap) return;

    const deps = depsMap.get(property);

    if (!deps) return;

    deps.forEach(effect => {
        schedule(effect);
    });
}