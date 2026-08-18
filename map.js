const depsMap = new Map();

const countSubscribers = new Set();

countSubscribers.add(() => {
    console.log("Count Updated");
});

depsMap.set("count", countSubscribers);

depsMap.get("count").forEach(fn => fn());

console.log(depsMap.has("count"));