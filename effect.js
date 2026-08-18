export let activeEffect = null;

export function effect(fn) {
    const effectFn = () => {
        activeEffect = effectFn;
        fn();
        activeEffect = null;
    };

    effectFn();

    return effectFn;
}