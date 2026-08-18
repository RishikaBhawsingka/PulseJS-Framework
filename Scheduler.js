let queue = new Set();
let isPending = false;

export function schedule(effect) {
    queue.add(effect);

    if (!isPending) {
        isPending = true;

        queueMicrotask(() => {
            queue.forEach(effect => effect());

            queue.clear();
            isPending = false;
        });
    }
}